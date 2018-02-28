// http://forums.rotoworld.com/topic/269757-how-all-statistics-are-counted-a-primer/ useful stat info

function getStat(elem, key_list) {
  if (key_list.charAt(0) === '#') {
    let result;

    switch(key_list) {
      case '#points':
        result = 2*getStat(elem, 'two_pt.made')
               + 3*getStat(elem, 'three_pt.made')
               + 1*getStat(elem, 'free_throws.made');
        break;
      case '#min':
        result = getStat(elem, 'time');
        let min = Math.floor(result/60);
        min = (min < 10 ? '0'+min : min);
        let sec = result % 60;
        sec = (sec < 10 ? '0'+sec : sec);
        result = min + ':' + sec;
        break;
      case '#field_goals-made':
        result = getStat(elem, 'two_pt.made')
               + getStat(elem, 'three_pt.made');
        break;
      case '#field_goals-att':
        result = getStat(elem, 'two_pt.att')
               + getStat(elem, 'three_pt.att');
        break;
      case '#field_goals-pct':
        result = getStat(elem, '#field_goals-made')
               / getStat(elem, '#field_goals-att');
        result = Math.round(result*10000) / 100; // % to 2 decimal places
        result = result + '%';
        break;
      case '#two_pt-pct':
        result = getStat(elem, 'two_pt.made')
               / getStat(elem, 'two_pt.att');
        result = Math.round(result*10000) / 100; // % to 2 decimal places
        result = result + '%';
        break;
      case '#three_pt-pct':
        result = getStat(elem, 'three_pt.made')
               / getStat(elem, 'three_pt.att');
        result = Math.round(result*10000) / 100; // % to 2 decimal places
        result = result + '%';
        break;
      case '#free_throws-pct':
        result = getStat(elem, 'free_throws.made')
               / getStat(elem, 'free_throws.att');
        result = Math.round(result*10000) / 100; // % to 2 decimal places
        result = result + '%';
        break;
      case '#rebounds':
        result = getStat(elem, 'rebounds.def')
               + getStat(elem, 'rebounds.off');
        break;
    }
    return result;
  }
  else {
    let keys = key_list.split('.');
    let key = keys.splice(0,1).join('');
    let remaining_keys = keys.join('.');

    if (remaining_keys.length === 0) {
      return elem[key];
    }
    else {
      return getStat(elem[key], remaining_keys);
    }
  }
}

function buildTable(table_element, stat_list, player_list) {
    // header row
    var row = $("<tr/>");
    $.each(stat_list, function(_, stat) {
      row.append($("<th/>").text(stat.col_name));
    });
    table_element.append(row);

    // table body
    $.each(player_list, function(_, player) {
      var row = $("<tr/>");
      $.each(stat_list, function(_, stat) {
        row.append($("<td/>").text(getStat(player, stat.key_name)));
      });
      table_element.append(row);
    });
    return table_element;
}

function generateNewPlayerData(name_list) {
  player_data = [];
  for (let i = 0; i < name_list.length; ++i) {
    player_data.push({
      number: i+1,
      name: name_list[i],
      time: 550,
      two_pt: {made: 2, att: 3},
      three_pt: {made: 4, att: 5},
      free_throws: {made: 9, att: 10},
      rebounds: {def: 5, off: 7},
      assists: 3,
      steals: 6,
      blocks: {for: 2, against: 3},
      turnovers: 5,
      fouls: {committed: 2, received: 2}
    });
  }
  return player_data;
}

$(document).ready(function() {
  let team1 = ['Player_1_a', 'Player_1_b', 'Player_1_c', 'Player_1_d', 'Player_1_e', 'Player_1_f'];
  let team2 = ['Player_2_a', 'Player_2_b', 'Player_2_c', 'Player_2_d', 'Player_2_e', 'Player_2_f'];

  let player_list_1 = generateNewPlayerData(team1);

  let player_list_2 = generateNewPlayerData(team2);

  let stat_list = [
    {col_name: '#', key_name: 'number'},
    {col_name: 'Player', key_name: 'name'},
    {col_name: 'MIN', key_name: '#min'},
    {col_name: 'PTS', key_name: '#points'},
    {col_name: 'FGM', key_name: '#field_goals-made'},
    {col_name: 'FGA', key_name: '#field_goals-att'},
    {col_name: 'FG%', key_name: '#field_goals-pct'},
    {col_name: '2PM', key_name: 'two_pt.made'},
    {col_name: '2PA', key_name: 'two_pt.att'},
    {col_name: '2P%', key_name: '#two_pt-pct'},
    {col_name: '3PM', key_name: 'three_pt.made'},
    {col_name: '3PA', key_name: 'three_pt.att'},
    {col_name: '3P%', key_name: '#three_pt-pct'},
    {col_name: 'FTM', key_name: 'free_throws.made'},
    {col_name: 'FTA', key_name: 'free_throws.att'},
    {col_name: 'FT%', key_name: '#free_throws-pct'},
    {col_name: 'DREB', key_name: 'rebounds.def'},
    {col_name: 'OREB', key_name: 'rebounds.off'},
    {col_name: 'REB', key_name: '#rebounds'},
    {col_name: 'AST', key_name: 'assists'},
    {col_name: 'PFCm', key_name: 'fouls.committed'},
    {col_name: 'PFRv', key_name: 'fouls.received'},
    {col_name: 'TO', key_name: 'turnovers'},
    {col_name: 'STL', key_name: 'steals'},
    {col_name: 'BLKFv', key_name: 'blocks.for'},
    {col_name: 'BLKAg', key_name: 'blocks.against'}
  ];

  var team1_table = buildTable($('#team1_table'), stat_list, player_list_1);
  var team2_table = buildTable($('#team2_table'), stat_list, player_list_2);
  
});

// console.log(stat_list);
// console.log(player_list);
//
// for (let player of player_list) {
//   for (let stat of stat_list) {
//     console.log(getStat(player, stat.key_name));
//   }
//   console.log('');
//   console.log('-------');
//   console.log('');
// }

// $(document).ready(function(){
//   $("#shot_btn").click(function() {
//     $("#someone").doSomething();
//   });
// });
