// PixelWeirdo — skin-badge.js
// Injects an unlocked skin badge onto blog card thumbnails.
(function () {

  function gs(k,d){ try{ var r=localStorage.getItem('pwg_'+k); return r!==null?JSON.parse(r):d; }catch(e){return d;} }

  var SKIN_FOR_LEVEL = {
    'rocket-league':'referee','undertale':'frisk','hades':'warrior',
    'stardew-valley':'farmer','amnesia':'ghost','fallout-3':'vault',
    'skyrim':'viking','pokemon':'trainer','crash-bandicoot':'bandicoot',
    'the-sims':'simmer','last-of-us':'survivor','world-of-warcraft':'mage',
    'princess-peach':'princess','overcooked':'chef','moving-out':'mover',
    'dark-souls':'undead','breath-of-the-wild':'hero','knack':'golem',
    'edith-finch':'storyteller','it-takes-two':'partner','disco-elysium':'detective','minecraft':'crafter',
    'red-dead-redemption-2':'cowboy','journey':'wanderer','among-us':'crewmate',
    'hollow-knight':'knight','celeste':'climber','spiritfarer':'ferrymaster',
    'portal-2':'testsubject','tetris':'blockmaster','animal-crossing':'villager',
    'stanley-parable':'stanley','outer-wilds':'hearthian','unpacking':'unpacker',
    'night-in-the-woods':'mae','frostpunk':'captain','inside':'redshirt',
    'firewatch':'ranger','katamari-damacy':'prince','papers-please':'inspector'
  };

  var SKIN_NAME = {
    'referee':'Referee','frisk':'Frisk','warrior':'Warrior','farmer':'Farmer',
    'ghost':'Ghost','vault':'Vault Dweller','viking':'Viking','trainer':'Trainer',
    'bandicoot':'Bandicoot','simmer':'Plumbob','survivor':'Survivor','mage':'Mage',
    'princess':'Princess','chef':'Chef','mover':'Mover','undead':'Undead Knight',
    'hero':'Hero of the Wild','golem':'Relic Golem','storyteller':'Storyteller',
    'partner':'Partner','detective':'Detective','crafter':'Crafter',
    'cowboy':'Cowboy','wanderer':'Wanderer','crewmate':'Crewmate',
    'knight':'The Knight','climber':'Climber','ferrymaster':'Ferrymaster',
    'testsubject':'Test Subject','blockmaster':'Block Master','villager':'The Villager',
    'stanley':'Stanley','hearthian':'Hearthian','unpacker':'The Unpacker',
    'mae':'Mae','captain':'The Captain','redshirt':'Red Shirt',
    'ranger':'Henry','prince':'The Prince','inspector':'The Inspector'
  };

  // Draw a skin at 2x scale on a 44×56 canvas
  function drawSkinMini(ctx2, skinId) {
    var x=1, y=2, S=1.4;
    ctx2.clearRect(0,0,30,38);

    if(skinId==='referee'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+1,S*4,S*4);
      ctx2.fillStyle='#111'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      for(var i=0;i<3;i++){ ctx2.fillStyle=i%2===0?'#fff':'#111'; ctx2.fillRect(x+2,y+8+i*S*2,S*5,S); }
      ctx2.fillStyle='#ff2200'; ctx2.fillRect(x+5,y+10,S,S*2);
      ctx2.fillStyle='#111'; ctx2.fillRect(x+3,y+1,S*4,S);
      ctx2.fillStyle='#2a1a5e'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#111'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+14,y+10,4,3);
    } else if(skinId==='frisk'){
      ctx2.fillStyle='#c8894a'; ctx2.fillRect(x+3,y+1,S*4,S*4);
      ctx2.fillStyle='#5544cc'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      for(var i=0;i<3;i++){ ctx2.fillStyle=i%2===0?'#5544cc':'#aa6622'; ctx2.fillRect(x+2,y+8+i*3,S*5,3); }
      ctx2.fillStyle='#7a4a14'; ctx2.fillRect(x+3,y+1,S*4,S); ctx2.fillRect(x+2,y+1,S,S*3);
      ctx2.fillStyle='#2a1a5e'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#7a5a34'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='warrior'){
      ctx2.fillStyle='#333'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#555'; ctx2.fillRect(x+2,y+1,S*5,S*2);
      ctx2.fillStyle='#ff4400'; ctx2.fillRect(x+4,y+4,S,S); ctx2.fillRect(x+8,y+4,S,S);
      ctx2.fillStyle='#444'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#cc1100'; ctx2.fillRect(x-2,y+6,4,S*8); ctx2.fillRect(x+16,y+6,4,S*8);
      ctx2.fillStyle='#888'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#666'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='farmer'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#3a5a8a'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#f5e090'; ctx2.fillRect(x+1,y+0,S*6,3);
      ctx2.fillStyle='#c8a020'; ctx2.fillRect(x+3,y-4,S*4,6);
      ctx2.fillStyle='#3a5a8a'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#8b5a2a'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='ghost'){
      ctx2.fillStyle='rgba(230,230,255,0.95)'; ctx2.fillRect(x+2,y+0,S*5,S*7);
      ctx2.fillRect(x,y+8,S,S*8); ctx2.fillRect(x+12,y+8,S,S*8);
      for(var i=0;i<5;i++) ctx2.fillRect(x+i*4,y+22,4,i%2===0?4:2);
      ctx2.fillStyle='#2222aa'; ctx2.fillRect(x+4,y+6,S*2,S*2); ctx2.fillRect(x+8,y+6,S*2,S*2);
      ctx2.fillStyle='#fff'; ctx2.fillRect(x+5,y+7,S,S); ctx2.fillRect(x+9,y+7,S,S);
    } else if(skinId==='vault'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+1,S*4,S*4);
      ctx2.fillStyle='#2244aa'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+4,y+9,S*3,S); ctx2.fillRect(x+4,y+12,S*3,S);
      ctx2.fillStyle='#3a2a0a'; ctx2.fillRect(x+3,y+1,S*4,S);
      ctx2.fillStyle='#2244aa'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
      ctx2.fillStyle='#00ff44'; ctx2.fillRect(x+13,y+14,5,4);
    } else if(skinId==='viking'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+3,S*4,S*3);
      ctx2.fillStyle='#777'; ctx2.fillRect(x+2,y+1,S*5,S*3);
      ctx2.fillStyle='#999'; ctx2.fillRect(x+2,y+1,S*5,S);
      ctx2.fillStyle='#ccc'; ctx2.fillRect(x,y-2,4,6); ctx2.fillRect(x+14,y-2,4,6);
      ctx2.fillStyle='#8a4a1a'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#c07030'; ctx2.fillRect(x+3,y+9,S*4,S);
      ctx2.fillStyle='#8a4a1a'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#555'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='trainer'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#cc1111'; ctx2.fillRect(x+2,y-1,S*5,S*2);
      ctx2.fillStyle='#991100'; ctx2.fillRect(x+2,y-1,S*5,S);
      ctx2.fillStyle='#2255cc'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#fff'; ctx2.fillRect(x+4,y+8,S,S*5);
      ctx2.fillStyle='#226699'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#cc1111'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='bandicoot'){
      ctx2.fillStyle='#e07010'; ctx2.fillRect(x+3,y+1,S*4,S*4);
      ctx2.fillStyle='#f0a040'; ctx2.fillRect(x+4,y+2,S*3,S*2);
      ctx2.fillStyle='#111'; ctx2.fillRect(x+4,y+3,S,S); ctx2.fillRect(x+8,y+3,S,S);
      ctx2.fillStyle='#e07010'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#3a6aaa'; ctx2.fillRect(x+3,y+14,S*4,S*3);
      ctx2.fillStyle='#cc5500'; for(var i=0;i<3;i++) ctx2.fillRect(x+4+i*3,y-3,2,4);
      ctx2.fillStyle='#3a6aaa'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#e07010'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='simmer'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+3,S*4,S*3);
      ctx2.fillStyle='#00dd44';
      ctx2.beginPath(); ctx2.moveTo(x+11,y-4); ctx2.lineTo(x+3,y+2); ctx2.lineTo(x+11,y+6); ctx2.lineTo(x+19,y+2); ctx2.fill();
      ctx2.fillStyle='#00ff55'; ctx2.beginPath(); ctx2.moveTo(x+11,y+0); ctx2.lineTo(x+6,y+2); ctx2.lineTo(x+16,y+2); ctx2.fill();
      ctx2.fillStyle='#5588cc'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#5588cc'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
    } else if(skinId==='survivor'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+1,S*3,S*2);
      ctx2.fillStyle='#cc4422'; ctx2.fillRect(x+3,y+4,S*4,S*2);
      ctx2.fillStyle='#3a5a2a'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#2a3a1a'; ctx2.fillRect(x+3,y+1,S*4,S); ctx2.fillRect(x+2,y+1,S,S*4); ctx2.fillRect(x+10,y+1,S,S*4);
      ctx2.fillStyle='#2a3a14'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
    } else if(skinId==='mage'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+3,S*4,S*3);
      ctx2.fillStyle='#2233aa'; ctx2.fillRect(x+2,y+8,S*5,S*6);
      ctx2.fillStyle='#3344cc'; ctx2.beginPath(); ctx2.moveTo(x+11,y-8); ctx2.lineTo(x+3,y+2); ctx2.lineTo(x+19,y+2); ctx2.fill();
      ctx2.fillStyle='#2233aa'; ctx2.fillRect(x+2,y+1,S*5,4);
      ctx2.fillStyle='#ffdd00'; ctx2.fillRect(x+10,y-4,2,2);
      ctx2.fillStyle='#6677ee'; ctx2.fillRect(x,y+8,S,S*6); ctx2.fillRect(x+12,y+8,S,S*6);
      ctx2.fillStyle='#2233aa'; ctx2.fillRect(x+3,y+18,S*2,S*4); ctx2.fillRect(x+7,y+18,S*2,S*4);
      ctx2.fillStyle='#8b5a2a'; ctx2.fillRect(x+15,y+4,3,22); ctx2.fillStyle='#aaccff'; ctx2.fillRect(x+13,y+1,7,6);
    } else if(skinId==='princess'){
      ctx2.fillStyle='#f5c0c0'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#ffdd00'; ctx2.fillRect(x+3,y+0,S*4,3); ctx2.fillRect(x+3,y-4,3,6); ctx2.fillRect(x+7,y-6,4,8); ctx2.fillRect(x+11,y-4,3,6);
      ctx2.fillStyle='#ff6699'; ctx2.fillRect(x+1,y+8,S*6,S*6);
      ctx2.fillStyle='#ff88bb'; ctx2.fillRect(x+1,y+12,S*6,S*2);
      ctx2.fillStyle='#ff6699'; ctx2.fillRect(x-1,y+8,S,S*5); ctx2.fillRect(x+13,y+8,S,S*5);
      ctx2.fillStyle='#ff6699'; ctx2.fillRect(x+2,y+20,S*3,S*3); ctx2.fillRect(x+7,y+20,S*3,S*3);
      ctx2.fillStyle='#ffcc88'; ctx2.fillRect(x+2,y+2,S,S*4); ctx2.fillRect(x+10,y+2,S,S*4);
    } else if(skinId==='chef'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+3,S*4,S*3);
      ctx2.fillStyle='#fff'; ctx2.fillRect(x+2,y-2,S*5,7); ctx2.fillRect(x+3,y-4,S*4,3);
      ctx2.fillStyle='#fff'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#ddd'; ctx2.fillRect(x+8,y+8,2,S*5);
      ctx2.fillStyle='#cc2200'; ctx2.fillRect(x+3,y+13,5,4);
      ctx2.fillStyle='#2a2a2a'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
    } else if(skinId==='mover'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+2,y+0,S*5,S*2);
      ctx2.fillStyle='#ffaa00'; ctx2.fillRect(x+2,y+2,S*5,S);
      ctx2.fillStyle='#e07010'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#ffff00'; ctx2.fillRect(x+3,y+10,S*4,2); ctx2.fillRect(x+3,y+15,S*4,2);
      ctx2.fillStyle='#333'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#555'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='undead'){
      ctx2.fillStyle='#222'; ctx2.fillRect(x+3,y+1,S*4,S*4);
      ctx2.fillStyle='#333'; ctx2.fillRect(x+2,y+1,S*5,S);
      ctx2.fillStyle='#ff6600'; ctx2.fillRect(x+4,y+4,S,S); ctx2.fillRect(x+8,y+4,S,S);
      ctx2.fillStyle='#ffaa00'; ctx2.fillRect(x+5,y+4,S/2,S/2); ctx2.fillRect(x+9,y+4,S/2,S/2);
      ctx2.fillStyle='#1a1a1a'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#333'; ctx2.fillRect(x+4,y+9,S*3,S); ctx2.fillRect(x+4,y+13,S*3,S);
      ctx2.fillStyle='#222'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='rgba(255,100,0,0.5)'; ctx2.fillRect(x-2,y+14,3,10); ctx2.fillRect(x+17,y+16,3,8);
    } else if(skinId==='hero'){
      // Hero of the Wild — green tunic, blonde hair, pointy hat
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+3,S*4,S*3);
      ctx2.fillStyle='#2a7a2a'; ctx2.beginPath(); ctx2.moveTo(x+11,y-8); ctx2.lineTo(x+3,y+3); ctx2.lineTo(x+19,y+3); ctx2.fill();
      ctx2.fillStyle='#1a5a1a'; ctx2.fillRect(x+3,y+2,S*4,3);
      ctx2.fillStyle='#f0c830'; ctx2.fillRect(x+2,y+3,S,S*3); ctx2.fillRect(x+11,y+3,S,S*3);
      ctx2.fillStyle='#2a7a2a'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#1a5a1a'; ctx2.fillRect(x+4,y+8,S,S*5);
      ctx2.fillStyle='#8b5a2a'; ctx2.fillRect(x+2,y+14,S*5,2);
      ctx2.fillStyle='#c8a020'; ctx2.fillRect(x+7,y+13,4,4);
      ctx2.fillStyle='#c8a060'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#5a3010'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
      ctx2.fillStyle='#4444cc'; ctx2.fillRect(x+14,y+8,5,8);
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+16,y+9,2,6);
    } else if(skinId==='golem'){
      // Relic Golem — patchwork stone body, glowing amber eyes, mismatched pieces
      // torso — chunky, mismatched relic segments in earthy tones
      ctx2.fillStyle='#8a6a3a'; ctx2.fillRect(x+1,y+7,S*6,S*6);
      ctx2.fillStyle='#6a4a2a'; ctx2.fillRect(x+2,y+8,S*2,S*2);
      ctx2.fillStyle='#aa8a5a'; ctx2.fillRect(x+6,y+8,S*2,S*2);
      ctx2.fillStyle='#5a7a3a'; ctx2.fillRect(x+2,y+12,S*2,S*2);
      ctx2.fillStyle='#7a5a8a'; ctx2.fillRect(x+6,y+12,S*2,S*2);
      // head — square, rocky
      ctx2.fillStyle='#9a7a4a'; ctx2.fillRect(x+2,y+0,S*5,S*5);
      ctx2.fillStyle='#7a5a2a'; ctx2.fillRect(x+3,y+1,S*2,S*2);
      ctx2.fillStyle='#aa8a5a'; ctx2.fillRect(x+7,y+1,S*2,S*2);
      // glowing amber eyes
      ctx2.fillStyle='#ff9900'; ctx2.fillRect(x+3,y+2,S*2,S*2);
      ctx2.fillStyle='#ffcc44'; ctx2.fillRect(x+4,y+3,S,S);
      ctx2.fillStyle='#ff9900'; ctx2.fillRect(x+7,y+2,S*2,S*2);
      ctx2.fillStyle='#ffcc44'; ctx2.fillRect(x+8,y+3,S,S);
      // cracks across face
      ctx2.fillStyle='#3a2a0a'; ctx2.fillRect(x+5,y+0,S,S*4);
      // arms — oversized, relic-patched
      ctx2.fillStyle='#7a5a2a'; ctx2.fillRect(x-2,y+7,4,S*7);
      ctx2.fillStyle='#5a7a3a'; ctx2.fillRect(x-2,y+10,4,3);
      ctx2.fillStyle='#7a5a2a'; ctx2.fillRect(x+16,y+7,4,S*7);
      ctx2.fillStyle='#7a5a8a'; ctx2.fillRect(x+16,y+10,4,3);
      // legs — thick stone blocks
      ctx2.fillStyle='#8a6a3a'; ctx2.fillRect(x+2,y+18,S*2,S*4);
      ctx2.fillStyle='#6a4a2a'; ctx2.fillRect(x+7,y+18,S*2,S*4);
      ctx2.fillStyle='#5a4a2a'; ctx2.fillRect(x+1,y+25,S*3,S); ctx2.fillRect(x+7,y+25,S*3,S);
    } else if(skinId==='storyteller'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#c8883a'; ctx2.fillRect(x+2,y+0,S*5,3); ctx2.fillRect(x+2,y+0,S,S*5); ctx2.fillRect(x+11,y+0,S,S*5);
      ctx2.fillStyle='#2a2a2a'; ctx2.fillRect(x+3,y+5,S*2,S); ctx2.fillRect(x+7,y+5,S*2,S);
      ctx2.fillStyle='#aaccff'; ctx2.fillRect(x+4,y+5,S,S); ctx2.fillRect(x+8,y+5,S,S);
      ctx2.fillStyle='#2a2a2a'; ctx2.fillRect(x+6,y+5,2,S);
      ctx2.fillStyle='#c06030'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#a04820'; ctx2.fillRect(x+6,y+8,2,S*5);
      ctx2.fillStyle='#e8e0d0'; ctx2.fillRect(x+3,y+9,S*3,S*3);
      ctx2.fillStyle='#4a3a2a'; ctx2.fillRect(x+6,y+9,S,S*3);
      ctx2.fillStyle='#c06030'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#5a3a2a'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='partner'){
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+2,S*4,S*4);
      ctx2.fillStyle='#3a2a1a'; ctx2.fillRect(x+3,y+2,S*4,S); ctx2.fillRect(x+10,y+2,S,S*3);
      ctx2.fillStyle='#cc5599'; ctx2.fillRect(x+2,y+8,S*3,S*5); ctx2.fillRect(x,y+8,S,S*5);
      ctx2.fillStyle='#5588cc'; ctx2.fillRect(x+7,y+8,S*3,S*5); ctx2.fillRect(x+12,y+8,S,S*5);
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+6,y+8,2,S*5);
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x-1,y+16,4,3); ctx2.fillRect(x+13,y+16,4,3);
      ctx2.fillStyle='#ff3366'; ctx2.fillRect(x+5,y+14,2,2); ctx2.fillRect(x+9,y+14,2,2); ctx2.fillRect(x+4,y+15,8,3); ctx2.fillRect(x+5,y+18,6,2); ctx2.fillRect(x+6,y+19,4,2); ctx2.fillRect(x+7,y+20,2,2);
      ctx2.fillStyle='#cc5599'; ctx2.fillRect(x+3,y+18,S*2,S*3);
      ctx2.fillStyle='#5588cc'; ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#2a2a2a'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='detective'){
      ctx2.fillStyle='#e8c090'; ctx2.fillRect(x+3,y+2,S*4,S*4); // face
      ctx2.fillStyle='rgba(100,70,40,0.35)'; ctx2.fillRect(x+3,y+4,S*4,S*3); // stubble
      ctx2.fillStyle='#5a3a1a'; ctx2.fillRect(x+2,y+1,S*5,S*2);
      ctx2.fillStyle='#4a2a0a'; ctx2.fillRect(x+2,y+1,S,S*3); ctx2.fillRect(x+12,y+1,S,S*3);
      ctx2.fillStyle='#6a4a20'; ctx2.fillRect(x+1,y+8,S*5,S*6); // trenchcoat
      ctx2.fillStyle='#4a3010'; ctx2.fillRect(x+1,y+8,S*2,S*6); // lapel
      ctx2.fillStyle='#e0e0e0'; ctx2.fillRect(x+4,y+8,4,4); // shirt
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x+6,y+10,2,8); ctx2.fillRect(x+5,y+18,4,4); // tie
      ctx2.fillStyle='#6a4a20'; ctx2.fillRect(x,y+8,S,S*5); ctx2.fillRect(x+12,y+8,S,S*5); // arms
      ctx2.fillStyle='#e8c090'; ctx2.fillRect(x-1,y+16,3,3); ctx2.fillRect(x+14,y+16,3,3);
      ctx2.fillStyle='#f0f0e0'; ctx2.fillRect(x+17,y+15,5,2); ctx2.fillStyle='#ff6600'; ctx2.fillRect(x+20,y+15,2,2); // cigarette
      ctx2.fillStyle='#2a1a08'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#1a1206'; ctx2.fillRect(x+3,y+24,S*2,S); ctx2.fillRect(x+8,y+24,S*2,S);
    } else if(skinId==='crafter'){
      ctx2.fillStyle='#c8956c'; ctx2.fillRect(x+3,y+1,S*4,S*4); // Steve face
      ctx2.fillStyle='#3a2a1a'; ctx2.fillRect(x+3,y+1,S*4,S); ctx2.fillRect(x+3,y+1,S,S*3); ctx2.fillRect(x+10,y+1,S,S*3);
      ctx2.fillStyle='#ffffff'; ctx2.fillRect(x+4,y+3,3,3); ctx2.fillRect(x+9,y+3,3,3); // eyes white
      ctx2.fillStyle='#3a6aff'; ctx2.fillRect(x+5,y+4,2,2); ctx2.fillRect(x+10,y+4,2,2); // pupils
      ctx2.fillStyle='#2244cc'; ctx2.fillRect(x+2,y+8,S*5,S*5); ctx2.fillRect(x,y+8,S,S*5); // blue shirt
      ctx2.fillStyle='#c8956c'; ctx2.fillRect(x+13,y+8,S,S*4); // bare arm holding pickaxe
      ctx2.fillStyle='#888'; ctx2.fillRect(x+16,y+6,2,12); // pickaxe handle
      ctx2.fillStyle='#aaa'; ctx2.fillRect(x+13,y+5,8,4); // pick head
      ctx2.fillStyle='#555577'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3); // trousers
      ctx2.fillStyle='#6a3a10'; ctx2.fillRect(x+3,y+24,S*2,S); ctx2.fillRect(x+8,y+24,S*2,S); // boots
    } else if(skinId==='cowboy'){
      ctx2.fillStyle='#d4a870'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#8a5a1a'; ctx2.fillRect(x+1,y-2,S*6,3); ctx2.fillRect(x+3,y-4,S*4,4); // hat
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+4,2,2); ctx2.fillRect(x+9,y+4,2,2);
      ctx2.fillStyle='#8a3010'; ctx2.fillRect(x+2,y+8,S*5,S*5); // red shirt
      ctx2.fillStyle='#4a2808'; ctx2.fillRect(x+2,y+8,S*5,3); // vest top
      ctx2.fillStyle='#8a3010'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#4a3010'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#2a1808'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='wanderer'){
      ctx2.fillStyle='#e8c890'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#c84010'; ctx2.fillRect(x+2,y+8,S*5,S*5); // red robe
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+4,2,2); ctx2.fillRect(x+9,y+4,2,2);
      ctx2.fillStyle='#c84010'; ctx2.fillRect(x,y+8,S,S*5); ctx2.fillRect(x+13,y+8,S,S*5);
      ctx2.fillStyle='#e8c890'; ctx2.fillRect(x,y+18,S,S); ctx2.fillRect(x+13,y+18,S,S); // hands
      ctx2.fillStyle='#8a2008'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='crewmate'){
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x+2,y,S*5,S*3+2); // helmet
      ctx2.fillStyle='rgba(140,200,255,0.6)'; ctx2.fillRect(x+4,y+2,S*3,S*2); // visor
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x+1,y+8,S*6,S*5); // suit
      ctx2.fillStyle='#882222'; ctx2.fillRect(x+8,y+10,5,8); // backpack
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x,y+10,S,S*4); ctx2.fillRect(x+13,y+10,S,S*4);
      ctx2.fillStyle='#882222'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#330000'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='knight'){
      ctx2.fillStyle='#aaaacc'; ctx2.fillRect(x+3,y+1,S*4,S*4); // helmet
      ctx2.fillStyle='#8888aa'; ctx2.fillRect(x+3,y+1,S*4,3); // helm top
      ctx2.fillStyle='#111118'; ctx2.fillRect(x+5,y+4,S*2,S*2); // visor slit
      ctx2.fillStyle='#7c4dbe'; ctx2.fillRect(x+2,y+8,S*5,S*5); // purple cloak
      ctx2.fillStyle='#9999bb'; ctx2.fillRect(x+2,y+8,S*5,4); // chest plate
      ctx2.fillStyle='#9999bb'; ctx2.fillRect(x,y+8,S,S*5); ctx2.fillRect(x+13,y+8,S,S*5);
      ctx2.fillStyle='#555577'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#333344'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='climber'){
      ctx2.fillStyle='#f0c0c0'; ctx2.fillRect(x+3,y+2,S*4,S*3); // face
      ctx2.fillStyle='#cc66cc'; ctx2.fillRect(x+2,y+8,S*5,S*5); // pink hoodie
      ctx2.fillStyle='#3a2a5a'; ctx2.fillRect(x+3,y+1,S*4,4); // dark hair
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+4,2,2); ctx2.fillRect(x+9,y+4,2,2);
      ctx2.fillStyle='#cc66cc'; ctx2.fillRect(x,y+8,S,S*5); ctx2.fillRect(x+13,y+8,S,S*5);
      ctx2.fillStyle='#2255aa'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#112244'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='ferrymaster'){
      ctx2.fillStyle='#f0eeea'; ctx2.fillRect(x+3,y+2,S*4,S*3); // ghost-pale face
      ctx2.fillStyle='#3a4a6a'; ctx2.fillRect(x+2,y+8,S*5,S*5); // blue-grey coat
      ctx2.fillStyle='#2a3a50'; ctx2.fillRect(x+2,y,S*5,5); // dark hair
      ctx2.fillStyle='#1a1a2a'; ctx2.fillRect(x+5,y+4,2,2); ctx2.fillRect(x+9,y+4,2,2);
      ctx2.fillStyle='#3a4a6a'; ctx2.fillRect(x,y+8,S,S*5); ctx2.fillRect(x+13,y+8,S,S*5);
      ctx2.fillStyle='#f0eeea'; ctx2.fillRect(x,y+18,S,S); ctx2.fillRect(x+13,y+18,S,S);
      ctx2.fillStyle='rgba(180,240,255,0.7)'; ctx2.fillRect(x+17,y+8,5,5); // wisp
      ctx2.fillStyle='#2a3a50'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#1a2030'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='testsubject'){
      ctx2.fillStyle='#e8c890'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='rgba(100,160,220,0.5)'; ctx2.fillRect(x+4,y+3,8,6); // visor
      ctx2.fillStyle='#cc5500'; ctx2.fillRect(x+2,y+8,S*5,S*5); // orange jumpsuit
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+5,2,2); ctx2.fillRect(x+9,y+5,2,2);
      ctx2.fillStyle='#cc5500'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#884400'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+8,y+18,S*2,S*3);
      ctx2.fillStyle='#1a1a1a'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
    } else if(skinId==='blockmaster'){
      ctx2.fillStyle='#ccaa00'; ctx2.fillRect(x+2,y,S*5,S*2); // yellow S-head
      ctx2.fillStyle='#0a0a1a'; ctx2.fillRect(x+3,y+3,2,2); ctx2.fillRect(x+9,y+3,2,2);
      ctx2.fillStyle='#2255cc'; ctx2.fillRect(x+2,y+8,S*5,S*5); // blue body
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x,y+8,S,S*4); // red left arm
      ctx2.fillStyle='#22aa44'; ctx2.fillRect(x+13,y+8,S,S*4); // green right arm
      ctx2.fillStyle='#aa22cc'; ctx2.fillRect(x+3,y+18,S*2,S*2); // purple leg
      ctx2.fillStyle='#cc6600'; ctx2.fillRect(x+8,y+18,S*2,S*2); // orange leg
      ctx2.fillStyle='#1a1a3a'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='villager'){
      ctx2.fillStyle='#f5d090'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#3a8a3a'; ctx2.fillRect(x+2,y+8,S*5,S*5); // green shirt
      ctx2.fillStyle='#3a2a10'; ctx2.fillRect(x+3,y,S*4,4); // hair
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+5,2,2); ctx2.fillRect(x+9,y+5,2,2);
      ctx2.fillStyle='rgba(255,160,120,0.5)'; ctx2.fillRect(x+3,y+7,3,2); ctx2.fillRect(x+10,y+7,3,2); // rosy cheeks
      ctx2.fillStyle='#3a8a3a'; ctx2.fillRect(x,y+9,S,S*4); ctx2.fillRect(x+13,y+9,S,S*4);
      ctx2.fillStyle='#8a6a30'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#3a2a10'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='stanley'){
      ctx2.fillStyle='#e8c890'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#5a5a6a'; ctx2.fillRect(x+2,y+8,S*5,S*5); // grey suit
      ctx2.fillStyle='#5a3a1a'; ctx2.fillRect(x+3,y,S*4,3); // thinning hair
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+5,2,2); ctx2.fillRect(x+9,y+5,2,2);
      ctx2.fillStyle='#e8e8f0'; ctx2.fillRect(x+6,y+8,3,S*4); // white shirt strip
      ctx2.fillStyle='#aa2222'; ctx2.fillRect(x+7,y+10,2,S*3); // red tie
      ctx2.fillStyle='#5a5a6a'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#3a3a48'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#1a1a20'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='hearthian'){
      ctx2.fillStyle='#e8d0a0'; ctx2.fillRect(x+3,y+2,S*4,S*3); // helmet
      ctx2.fillStyle='rgba(100,160,255,0.4)'; ctx2.fillRect(x+4,y+3,8,6); // visor
      ctx2.fillStyle='#c07820'; ctx2.fillRect(x+2,y+8,S*5,S*5); // orange suit
      ctx2.fillStyle='#1a0a00'; ctx2.fillRect(x+5,y+4,3,3); ctx2.fillRect(x+9,y+4,3,3); // big eyes
      ctx2.fillStyle='#c07820'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#8a5010'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#3a2000'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='unpacker'){
      ctx2.fillStyle='#e8b880'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#6a3a9a'; ctx2.fillRect(x+2,y+8,S*5,S*5); // purple hoodie
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+2,y,S*5,5); // dark hair
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+5,2,2); ctx2.fillRect(x+9,y+5,2,2);
      ctx2.fillStyle='#6a3a9a'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#c8900a'; ctx2.fillRect(x+13,y+14,7,5); // small box
      ctx2.fillStyle='#2a4a7a'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#e8e8e8'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='mae'){
      ctx2.fillStyle='#1a1a2a'; ctx2.fillRect(x+2,y,S*5,S*3); // black cat head
      ctx2.fillStyle='#1a1a2a'; ctx2.fillRect(x+3,y-4,4,5); ctx2.fillRect(x+11,y-4,4,5); // ears
      ctx2.fillStyle='#e8cc00'; ctx2.fillRect(x+4,y+3,3,3); ctx2.fillRect(x+10,y+3,3,3); // yellow eyes
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x+2,y+8,S*5,S*5); // red/white striped shirt
      ctx2.fillStyle='#e8e8e8'; ctx2.fillRect(x+2,y+10,S*5,2); ctx2.fillRect(x+2,y+15,S*5,2); // stripes
      ctx2.fillStyle='#1a1a2a'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#2255aa'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#1a1a2a'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='captain'){
      ctx2.fillStyle='#d4a870'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#3a2a18'; ctx2.fillRect(x+1,y-2,S*6,5); // fur hat
      ctx2.fillStyle='#2a3a50'; ctx2.fillRect(x+3,y+4,3,3); ctx2.fillRect(x+9,y+4,3,3); // goggles
      ctx2.fillStyle='#1e2830'; ctx2.fillRect(x+2,y+8,S*5,S*5); // dark coat
      ctx2.fillStyle='#5a4030'; ctx2.fillRect(x+2,y+8,S*5,3); // fur collar
      ctx2.fillStyle='rgba(180,220,255,0.4)'; ctx2.fillRect(x+2,y+8,4,3); ctx2.fillRect(x+10,y+8,4,3); // frost
      ctx2.fillStyle='#1e2830'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#1a1e28'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#0a0e14'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='redshirt'){
      ctx2.fillStyle='#d8c8b0'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#cc2010'; ctx2.fillRect(x+2,y+8,S*5,S*5); // red shirt (only colour)
      ctx2.fillStyle='#1a1a1a'; ctx2.fillRect(x+2,y,S*5,5); // dark hair
      ctx2.fillStyle='#1a1a1a'; ctx2.fillRect(x+5,y+5,2,2); ctx2.fillRect(x+9,y+5,2,2);
      ctx2.fillStyle='#cc2010'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#1a1a22'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#0a0a0a'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='ranger'){
      ctx2.fillStyle='#d4956a'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#5a6a30'; ctx2.fillRect(x+2,y+8,S*5,S*5); // olive shirt
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+2,y,S*5,5); ctx2.fillRect(x+2,y+4,2,3); // messy hair
      ctx2.fillStyle='#3a2a12'; ctx2.fillRect(x+4,y+8,7,3); // beard
      ctx2.fillStyle='rgba(220,180,80,0.7)'; ctx2.fillRect(x+3,y+10,3,2); // badge
      ctx2.fillStyle='#5a6a30'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#4a4020'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#3a2010'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else if(skinId==='prince'){
      ctx2.fillStyle='#f0d8b0'; ctx2.fillRect(x+3,y+1,S*4,S*3);
      ctx2.fillStyle='#228822'; ctx2.fillRect(x+2,y+8,S*5,S*5); // green suit
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+3,y-2,7,3); ctx2.fillRect(x+4,y-4,2,3); ctx2.fillRect(x+8,y-4,2,3); // crown
      ctx2.fillStyle='#228822'; ctx2.fillRect(x+5,y-5,2,5); ctx2.fillRect(x+11,y-5,2,5); // antennae
      ctx2.fillStyle='#ffee00'; ctx2.fillRect(x+5,y-5,3,3); ctx2.fillStyle='#ff4488'; ctx2.fillRect(x+11,y-5,3,3); // antenna tips
      ctx2.fillStyle='#1a1a00'; ctx2.fillRect(x+4,y+3,3,3); ctx2.fillRect(x+9,y+3,3,3); // big eyes
      ctx2.fillStyle='#ffcc00'; ctx2.fillRect(x+2,y+16,S*5,2); // belt
      ctx2.fillStyle='#228822'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#116611'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#f0f0f0'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S); // white boots
    } else if(skinId==='inspector'){
      ctx2.fillStyle='#c8a870'; ctx2.fillRect(x+3,y+2,S*4,S*3);
      ctx2.fillStyle='#4a4030'; ctx2.fillRect(x+2,y+8,S*5,S*5); // grey uniform
      ctx2.fillStyle='#3a3020'; ctx2.fillRect(x,y-2,S*5+2,4); ctx2.fillRect(x+2,y-6,S*4,5); // cap
      ctx2.fillStyle='#cc9900'; ctx2.fillRect(x+7,y-5,3,2); // cap badge
      ctx2.fillStyle='#2a1a0a'; ctx2.fillRect(x+5,y+4,2,2); ctx2.fillRect(x+9,y+4,2,2); // weary eyes
      ctx2.fillStyle='#3a2a10'; ctx2.fillRect(x+5,y+7,7,2); // moustache
      ctx2.fillStyle='#cc9900'; ctx2.fillRect(x+3,y+10,3,3); ctx2.fillRect(x+8,y+10,3,3); // medals
      ctx2.fillStyle='#4a4030'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+13,y+8,S,S*4);
      ctx2.fillStyle='#cc2222'; ctx2.fillRect(x+13,y+13,6,4); // stamp in hand
      ctx2.fillStyle='#2a2018'; ctx2.fillRect(x+3,y+18,S*2,S*2); ctx2.fillRect(x+8,y+18,S*2,S*2);
      ctx2.fillStyle='#1a1408'; ctx2.fillRect(x+2,y+22,S*3,S); ctx2.fillRect(x+7,y+22,S*3,S);
    } else {
      // default — purple hoodie with glasses
      ctx2.fillStyle='#7c4dbe'; ctx2.fillRect(x+2,y+8,S*5,S*5);
      ctx2.fillStyle='#f5d0a9'; ctx2.fillRect(x+3,y+1,S*4,S*4);
      ctx2.fillStyle='#3a2a0a'; ctx2.fillRect(x+3,y+1,S*4,S); ctx2.fillRect(x+3,y+1,S,S*2);
      ctx2.fillStyle='#1a1a2e'; ctx2.fillRect(x+4,y+4,S*2,S); ctx2.fillRect(x+8,y+4,S*2,S);
      ctx2.fillStyle='#aaaaff'; ctx2.fillRect(x+4,y+4,S,S); ctx2.fillRect(x+8,y+4,S,S);
      ctx2.fillStyle='#2a1a5e'; ctx2.fillRect(x+3,y+18,S*2,S*3); ctx2.fillRect(x+7,y+18,S*2,S*3);
      ctx2.fillStyle='#f0ab5a'; ctx2.fillRect(x+2,y+24,S*3,S); ctx2.fillRect(x+7,y+24,S*3,S);
      ctx2.fillStyle='#7c4dbe'; ctx2.fillRect(x,y+8,S,S*4); ctx2.fillRect(x+12,y+8,S,S*4);
    }
  }


  // Level index (0-based) for game.html?level=N links
  var LEVEL_IDX = {
    'rocket-league':0,'undertale':1,'hades':2,'stardew-valley':3,
    'amnesia':4,'fallout-3':5,'skyrim':6,'pokemon':7,
    'crash-bandicoot':8,'the-sims':9,'last-of-us':10,
    'world-of-warcraft':11,'princess-peach':12,'overcooked':13,
    'moving-out':14,'dark-souls':15,'breath-of-the-wild':16,'knack':17,
    'edith-finch':18,'it-takes-two':19,'disco-elysium':20,'minecraft':21,
    'red-dead-redemption-2':22,'journey':23,'among-us':24,
    'hollow-knight':25,'celeste':26,'spiritfarer':27,
    'portal-2':28,'tetris':29,'animal-crossing':30,
    'stanley-parable':31,'outer-wilds':32,'unpacking':33,
    'night-in-the-woods':34,'frostpunk':35,'inside':36,
    'firewatch':37,'katamari-damacy':38,'papers-please':39
  };

  function injectBadges() {
    var ach = gs('ach', {});
    var thumbs = document.querySelectorAll('.card-thumb[data-slug], .post-row-thumb[data-slug]');
    thumbs.forEach(function(thumb) {
      var slug    = thumb.getAttribute('data-slug');
      if (!slug)  return;
      var unlocked = !!ach[slug];

      var badge = document.createElement('div');

      if (unlocked) {
        // ── Unlocked: skin preview + name ──────────────────
        var skinId = SKIN_FOR_LEVEL[slug] || 'default';
        var name   = SKIN_NAME[skinId]   || 'PixelWeirdo';
        badge.className = 'card-skin-badge';
        badge.title = name + ' unlocked';

        var c = document.createElement('canvas');
        c.width = 30; c.height = 38;
        drawSkinMini(c.getContext('2d'), skinId);
        badge.appendChild(c);

        var label = document.createElement('span');
        label.className = 'card-skin-badge-label';
        label.textContent = name;
        badge.appendChild(label);

      } else {
        // ── Locked: padlock + "Play to unlock" ─────────────
        badge.className = 'card-skin-badge card-skin-badge--locked';
        badge.title = 'Play this level to unlock a character skin';

        var lock = document.createElement('span');
        lock.className = 'card-skin-lock-icon';
        lock.textContent = '🔒';
        badge.appendChild(lock);

        var label = document.createElement('span');
        label.className = 'card-skin-badge-label';
        label.textContent = 'Locked';
        badge.appendChild(label);
      }

      thumb.appendChild(badge);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBadges);
  } else {
    injectBadges();
  }
}());
