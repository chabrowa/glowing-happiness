Accounts.onCreateUser(function(options, user) {
  user.hp = 50;
  user.defence = 0;
  user.luck = 50;
  user.dexterity = 10;
  user.strength = 10;
  user.speed = 10;
  user.xp = 0;
  user.level = 1;
  user.gold = 0;
  user.diamond = 0;
  user.pointsToSpend = 10;
  user.className = options.profile.className;
  user.ownedItems = [
    {
      name: 'Nothing',
      type: 'armor',
      characteristics: [],
      image: '/images/blank.svg'
    },
    {
      name: 'Nothing',
      type: 'weapon',
      characteristics: [],
      image: '/images/blank.svg',
      handle: 0
    },
    {
      name: 'Nothing',
      type: 'stone',
      characteristics: [],
      image: '/images/blank.svg'
    },
    {
      name: 'Nothing',
      type: 'head',
      characteristics: [],
      image: '/images/blank.svg'
    }
  ];
  user.armor = {
    name: 'Nothing',
    characteristics: [],
    image: '/images/blank.svg'
  };
  user.leftHand = {
    name: 'Nothing',
    characteristics: [],
    image: '/images/blank.svg',
    handle: 0
  };
  user.rightHand = {
    name: 'Nothing',
    characteristics: [],
    image: '/images/blank.svg',
    handle: 0
  };
  user.head = {
    name: 'Nothing',
    characteristics: [],
    image: '/images/blank.svg'
  };
  user.stone = {
    name: 'Nothing',
    characteristics: [],
    image: '/images/blank.svg'
  };

  delete options.profile.className;

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
