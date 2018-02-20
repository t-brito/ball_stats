// http://forums.rotoworld.com/topic/269757-how-all-statistics-are-counted-a-primer/ useful stat info

var team1 = ['Player_1_a', 'Player_1_b', 'Player_1_c', 'Player_1_d', 'Player_1_e', 'Player_1_f']
var team2 = ['Player_2_a', 'Player_2_b', 'Player_2_c', 'Player_2_d', 'Player_2_e', 'Player_2_f']

let team1_player_data = generateNewPlayerData(team1);
let team2_player_data = generateNewPlayerData(team2);

console.log(team1_player_data);

buildTable('team1', team1_player_data);
buildTable('team2', team2_player_data);

function generateNewPlayerData(name_list) {
  player_data = [];
  for (let i = 0; i < name_list.length; ++i) {
    player_data.push({
      number: i+1,
      name: name_list[i],
      min: 0, // TODO date format
      two_pt: {made: 0, att: 0},
      three_pt: {made: 0, att: 0},
      free_throws: {made: 0, att: 0},
      rebounds: {def: 0, off: 0},
      assists: 0,
      steals: 0,
      blocks: {for: 0, against: 0},
      turnovers: 0,
      fouls: {committed: 0, received: 0}
    });
  }
  return player_data;
}

function buildTable(table_id, player_data) {
  let table = document.getElementById(table_id);

  // each row
  for (let i = 0; i < player_data.length; ++i) {
    row = table.insertRow(-1);
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].number; // number
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].name; // Player
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].min; // MIN
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].two_pt.made * 2
                   + player_data[i].three_pt.made * 3
                   + player_data[i].free_throws.made; // PTS
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].two_pt.made
                   + player_data[i].three_pt.made;  // FGM
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].two_pt.att
                   + player_data[i].three_pt.att; // FGA
    cell = row.insertCell(-1);
    cell.innerHTML = (player_data[i].two_pt.made
                   + player_data[i].three_pt.made)
                   / (player_data[i].two_pt.att
                   + player_data[i].three_pt.att);  // FG%
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].two_pt.made; // 2PM
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].two_pt.att; // 2PA
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].two_pt.made
                   / player_data[i].two_pt.att; // 2P%
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].three_pt.made; // 3PM
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].three_pt.att; // 3PA
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].three_pt.made
                   / player_data[i].three_pt.att; // 3P%
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].free_throws.made; // FTM
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].free_throws.att; // FTA
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].free_throws.made
                   / player_data[i].free_throws.att; // FT%
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].rebounds.def; // DREB
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].rebounds.off; // OREB
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].rebounds.def
                   + player_data[i].rebounds.off; // REB
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].assists; // AST
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].fouls.committed; // PFCm
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].fouls.received; // PFRv
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].turnovers; // TO
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].steals; // STL
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].blocks.for; // BLKFv
    cell = row.insertCell(-1);
    cell.innerHTML = player_data[i].blocks.against; // BLKAg
  }
}
