Accounts.onCreateUser(function(options, user) {
  user.hp = 50;
  user.defence = 0;
  user.luck = 50;
  user.dexterity = 10;
  user.strength = 10;
  user.speed = 10;
  user.pointsToSpend = 10;
  user.className = options.profile.className;
  user.race = options.profile.race;

  delete options.profile.className;
  delete options.profile.race;

  switch (user.className) {
    case 'Warrior':
      break;
    case 'Hunter':
      user.strength -= 2;
      user.dexterity += 2;
      break;
    case 'Thief':
      user.strength -= 2;
      user.speed += 2;
      break;
    case 'Miner':
      user.speed -= 2;
      user.luck += 10;
      break;
  }

  user.profile = options.profile;

  return user;
});
