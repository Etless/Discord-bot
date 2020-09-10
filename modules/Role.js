
module.exports.create = async function(guild) {
  var roles = guild.roles;
  var created = 0;

  // Create role for saints in guild
  if (!roles.cache.some(item => item.name === 'Saints')) {
    await roles.create({
    data: {
      name: 'Saints',
      color: '#ffe20d',
      hoist: true,
    },
    reason: 'A role for all saints',
    });
    created++;
  }

  // Create role for sinners in guild
  if (!roles.cache.some(item => item.name === 'Sinners')) {
    await roles.create({
    data: {
      name: 'Sinners',
      color: 'RED',
      hoist: true,
    },
    reason: 'A role for all sinners',
    });
    created++;
  }

  // Check if roles already exists
  if (created !== 0)
    return true;
  return false;
}


// Class to set roles for member
module.exports.Role = class {
  constructor(user) {
    this.user = user;
    this.role = user._json['role'];
  }

  // Role "operators"
  get() { return this.role; }
  update() {
    // Create array for roles 'Saints' and 'Sinners'
    var roles = [];
    var member = this.user.member;
    roles[0] = member.guild.roles.cache.filter(item => item.name === 'Saints').firstKey();
    roles[1] = member.guild.roles.cache.filter(item => item.name === 'Sinners').firstKey();

    if (roles[0] == null || roles[1] == null) return;

    // Remove member form roles if role is -1
    if (this.role < 0) {
      roles.forEach(item => {
        member.roles.remove(item);
      });
      return;
    }

    // Add member to choosen role and remove it from the other
    member.roles.add(roles[this.role]);
    member.roles.remove(roles[1-this.role]);
  }
  set(role) {
    // Return if member already is in this role or
    // if role is too high of a number
    if (role >= 2) return;
    if (this.role === role && !this.user.member.guild.roles.cache.some(item => item.name === (this.role === 0 ? 'Saints' : 'Sinners'))) return; //wip
    
    // Set new role
    this.role = role;
    this.update();
  }

  // Save role to _json
  _save() {
    this.user._json['role'] = this.role;
  }
}
