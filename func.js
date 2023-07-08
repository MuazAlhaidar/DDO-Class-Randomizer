function onLoadFunctions() {
  var seconds = 20,
    display = document.querySelector("#time");
  startTimer(seconds, display);
  // count = 0;
  // aux = document.getElementsByClassName("Selected");
  // for (let i = 0; i < aux.length; i++) {
  //   count++;
  //   aux[i].addEventListener("click", toggleSel);
  //   aux[i].id = "toggle" + count;
  // }
}

function startTimer(duration, display) {
  var timer = duration,
    seconds;
  setInterval(function () {
    seconds = parseInt(timer % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

function changeFont(fontChoice) {
  var body = document.body;
  var button = document.getElementsByName("bodybutton");
  if (fontChoice === "reg-font") {
    body.className = "";
    button.forEach((element) => {
      element.id = "regbutton";
    });
  } else if (fontChoice === "village-font") {
    body.className = "village";
    button.forEach((element) => {
      element.id = "villbutton";
    });
  }
}
function changeSelPaid(sel) {
  if (sel == 1) {
    aux = document.getElementsByClassName("notSelected");
    aux1 = aux.length;
    for (let i = 0; i < aux1; i++) {
      aux[0].className = "Selected";
    }
  }
  if (sel == 2) {
    aux1 = document.getElementsByClassName("Prem");
    for (let i = 0; i < aux1.length; i++) {
      aux2 = aux1[i].children;
      for (let j = 0; j < aux2.length; j++) {
        if (aux2[j].className === "Selected") {
          aux2[j].className = "notSelected";
        }
      }
    }
  }
  if (sel == 3) {
    aux2 = document.getElementById("Iconics").children;
    for (let j = 0; j < aux2.length; j++) {
      if (aux2[j].className === "Selected") {
        aux2[j].className = "notSelected";
      }
    }
  }
  document.getElementById("useHearth").className = "";
}
function toggleSel(clickInfo) {
  if (clickInfo.target.className == "Selected") {
    clickInfo.target.className = "notSelected";
  } else {
    clickInfo.target.className = "Selected";
  }
}
function getRaces() {
  aux = document.getElementById("race-sel");
  aux2 = aux.getElementsByClassName("Selected");
  aux3 = [];
  for (let i = 0; i < aux2.length; i++) {
    aux3.push(aux2[i].alt);
  }
  return aux3;
}
function getIconics() {
  aux = document.getElementById("Iconics");
  aux2 = aux.getElementsByClassName("Selected");
  aux3 = [];
  for (let i = 0; i < aux2.length; i++) {
    aux3.push(aux2[i].alt);
  }
  return aux3;
}
function getIconicClass(race) {
  switch (race) {
    case "Scourge":
      return { key: "Ranger", value: 6 };
    case "Bladeforged":
      return { key: "Paladin", value: 5 };
    case "Deep Gnome":
      return { key: "Wizard", value: 9 };
    case "PDK":
      return { key: "Fighter", value: 4 };
    case "Razorclaw":
      return { key: "Barbarian", value: 1 };
    case "Scoundrel":
      return { key: "Bard", value: 2 };
    case "Shadar-kai":
      return { key: "Rogue", value: 7 };
    case "Morninglord":
      return { key: "Cleric", value: 3 };
    case "Trailblazer":
      return { key: "Monk", value: 11 };
    default:
      return undefined;
  }
}
function getClasses() {
  aux = document.getElementById("class-sel");
  aux2 = aux.getElementsByClassName("Selected");
  aux3 = [];
  for (let i = 0; i < aux2.length; i++) {
    aux3.push({
      key: aux2[i].alt.substring(0, aux2[i].alt.length - 2),
      value: parseInt(aux2[i].alt.substring(aux2[i].alt.length - 2, aux2[i].alt.length)),
    });
  }
  return aux3;
}
function getLevelOptions() {
  aux = document.getElementById("level-opts");
  aux2 = aux.getElementsByClassName("Selected");
  aux3 = [];
  for (let i = 0; i < aux2.length; i++) {
    aux3.push(aux2[i].innerHTML);
  }
  if (aux3.length == 0) {
    aux3 = ["1"];
  }
  return aux3;
}
function sel_class(class_list, number, isTheRaceAnIconic, iconicClass) {
  aux = [];
  if (isTheRaceAnIconic) {
    aux.push(iconicClass);
    class_list = get_new_class_list(aux, class_list);
  }
  for (let i = 0; i < number - isTheRaceAnIconic; i++) {
    aux2 = randInt(0, class_list.length);
    aux = aux.concat(class_list[aux2]);
    class_list = get_new_class_list(aux, class_list);
  }
  return aux;
}
// randomized_choices & class_list = [["name of class", class id number][...][...]]
function get_new_class_list(randomized_choices, class_list) {
  // Removing classes from class list due to alignment restrictions
  // paladins cant multiclass with
  // bards, barbarians, druids, and acolytes of the skin

  // monks cant multiclass with
  // bards and barbarians

  // xorArray = { "Barbarian", "Bard", "Druid", ... }
  const xorClassesDueToAlignment = (class_list, xorArray) => {
    class_list = class_list.filter(function (element) {
      // remove the class from the class list so long as
      // it's name is in the xor class name array
      isAllowed = true;
      xorArray.forEach((xorElement) => {
        if (element.key === xorElement) {
          isAllowed = false;
          return;
        }
      });
      return isAllowed;
      //  return !(element.key in xorArray);
    });

    return class_list;
  };

  randomized_choices.forEach((element) => {
    switch (element.value) {
      // If a Paladin or Sacred Fist
      case 5:
        class_list = xorClassesDueToAlignment(class_list, [
          "Barbarian",
          "Bard",
          "Storm Singer",
          "Druid",
          "Blightcaster",
          "Acolyte Of The Skin",
        ]);
        break;
      // If a Monk
      case 11:
        class_list = xorClassesDueToAlignment(class_list, ["Barbarian", "Bard", "Storm Singer"]);
        break;
      // If a Barbarian or Bard
      case 1:
      case 2:
        class_list = xorClassesDueToAlignment(class_list, ["Paladin", "Sacred Fist", "Monk"]);
        break;
      // If a Druid or Acolyte Of The Skin
      case 10:
      case 12:
        if (element.key == "Acolyte Of The Skin") {
          class_list = xorClassesDueToAlignment(class_list, ["Paladin", "Sacred Fist"]);
          break;
        }
        class_list = xorClassesDueToAlignment(class_list, ["Paladin", "Sacred Fist"]);
        break;

      default:
        break;
    }
  });
  class_list = class_list.filter(function (ele) {
    let result = true;
    randomized_choices.forEach((element) => {
      if (element.value === ele.value) {
        result = false;
      }
    });
    return result;
  });

  return class_list;
}
function sel_levels(number) {
  min_level = Math.abs(document.getElementById("min_level").value);
  max_level = Math.abs(document.getElementById("max_level").value);
  if (number == 1) {
    return [20];
  } else {
    if (number == 2) {
      aux = randInt(Math.max(min_level, 10), Math.min(max_level + 1, 20));
      return [aux, 20 - aux];
    } else {
      aux = randInt(min_level, Math.min(max_level + 1, 19));
      aux2 = randInt(Math.max(1, Math.ceil((20 - aux) / 2)), Math.min(aux, 20 - aux));
      aux3 = 20 - aux - aux2;
      return [aux, aux2, aux3];
    }
  }
}
function ddoRandomizer() {
  race_list = getRaces();
  iconic_list = getIconics();
  class_list = getClasses();
  level_list = getLevelOptions();
  lvl_opts = level_list[randInt(0, level_list.length)];
  class_choices = null;
  level_choices = sel_levels(lvl_opts);
  race_choice = race_list[randInt(0, race_list.length)];
  if (iconic_list.indexOf(race_choice) != -1 && !document.getElementById("useHearth").checked) {
    needed = getIconicClass(race_choice);
    class_choices = sel_class(class_list, lvl_opts, true, needed);
  } else {
    class_choices = sel_class(class_list, lvl_opts, false, null);
  }
  ans_text = "<tr>" + "<td>" + race_choice + "</td>";
  for (let i = 0; i < lvl_opts; i++) {
    ans_text += "<td>" + class_choices[i].key + " " + level_choices[i] + "</td>";
  }

  ans_text += "</tr>";
  document.getElementById("rand_finished").innerHTML += ans_text;
}
function checkNum(el) {
  if (document.getElementById(el).value > 20) {
    document.getElementById(el).value = 20;
  } else if (document.getElementById(el).value < 7) {
    document.getElementById(el).value = 7;
  } else if (isNaN(document.getElementById(el).value)) {
    if (el == "min_level") document.getElementById(el).value = 7;
    else document.getElementById(el).value = 20;
  }
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function clearer() {
  document.getElementById("rand_finished").innerHTML =
    '<tr><th class="table_top">Race</th><th class="table_top">Class 1</th><th class="table_top">Class 2</th><th class="table_top">Class 3</th></tr>';
}
