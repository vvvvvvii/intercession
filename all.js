const url =
  "https://docs.google.com/forms/d/e/1FAIpQLSceO10fNBakZ5TxJtWlyti1j4uKnr2EEhtXutvsE5m3gCMdJg/formResponse";
let name = "";
let email = "";
let type = "";
let content = "";

function checkBlankInput(name, type, content) {
  const checkArr = [
    { name: name, errorMsg: "#errorInfoName" },
    { name: type, errorMsg: "#errorInfoType" },
    { name: content, errorMsg: "#errorInfoContent" },
  ];
  checkArr.forEach((item) => {
    if (item.name.length === 0) {
      $(item.errorMsg).removeClass("d-none");
      return;
    }
    $(item.errorMsg).addClass("d-none");
  });
  return checkArr.every((item) => item.name.length !== 0);
}
function sendData(data) {
  $.ajax({
    type: "POST",
    url,
    data,
    contentType: "application/json",
    dataType: "jsonp",
    complete: function () {
      handleResponse();
      $("#formSection").addClass("d-none");
      $("#responseSection").removeClass("d-none");
    },
  });
}
function handleResponse() {
  let responseData = [];
  switch (type) {
    case "身心健康":
      responseData = [
        "喜樂的心乃是良藥；憂傷的靈使骨枯乾。-箴言 17:22 ",
        "祂卻回答我，你只要有我的恩典就夠了，因為我的能力在你軟弱的時候顯得最剛強。-哥林多後書 12:9",
        "主耶和華說，我必親自牧養我的羊群，使他們得以躺臥。迷失的，我必尋找；被逐的，我必領回；受傷的，我必纏裹；軟弱的，我必加強。-以西結書 34:15-16",
      ];
      break;
    case "家庭人際":
      responseData = [
        "你們各人要快快地聽，慢慢地說，慢慢地動怒，因為人的怒氣，並不成就上帝的義。所以你們要脫去一切的污穢，和盈餘的邪惡，存溫柔的心領受那所栽種的道，就是能救你們靈魂的道。-雅各書 1:19-21",
        "我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。-詩篇23:4",
      ];
      break;
    case "學業工作":
      responseData = [
        "敬畏耶和華是知識的開端，愚妄人藐視智慧和訓誨-箴言 1:7",
        "你們看那天上的飛鳥，也不種也不收，也不積蓄在倉裡，你們的天父尚且養活牠，你們不比飛鳥貴重得多嗎？-馬太福音 6:26",
        "你出你入，耶和華要保護你，從今時直到永遠。-詩篇 121:7-8",
        "耶和華是我的產業，是我杯中的份，我所得的你為我持守。-詩篇 16:5",
      ];
      break;
    case "信仰":
      responseData = [
        "你們祈求，就給你們；尋找，就尋見；叩門，就給你們開門。-馬太福音 7:7",
        "凡求告耶和華的，就是誠心求告他的，耶和華便與他們相近。-詩篇 145:18",
        "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。-羅馬書 8:28",
        "盜賊來，無非要偷竊、殺害、毀壞；我來了，是要叫羊得生命，並且得的更豐盛。-約翰福音 10:10",
      ];
      break;
    case "教會事工&服事":
      responseData = [
        "我兒啊，你要藉著基督耶穌所賜的恩典剛強起來。你在許多證人面前從我領受了的教導，你也應該交付給你所信任而能夠教導別人的人。作為基督耶穌的忠勇戰士，你要分擔苦難。-提摩太後書 2:1-3",
        "要傳福音，不管時機理想不理想都要傳，用最大的耐心勸勉，督責，鼓勵，教導。-提摩太後書 4:2",
        "你們要以基督耶穌的心為心。-腓立比書 2:5",
        "你們要謙遜、溫柔、忍耐，以愛心互相寬容，以和平彼此聯繫，盡力保持聖靈所賜合而為一的心。-以弗所書 4:2-3",
      ];
      break;
    case "其他":
      responseData = [
        "應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴上帝。上帝所賜出人意外的平安，必在基督耶穌裡保守你們的心懷意念。-腓立比書 4:6-7",
        "要常常喜樂，不住的禱告，凡事謝恩，因為這是上帝在基督耶穌裡向你們所定的旨意。-帖撒羅尼迦前書 5:16-17",
      ];
      break;
    default:
      break;
  }
  const randomIndex = getRandom(0, responseData.length - 1);
  const content = responseData[randomIndex].split("-")[0];
  const verse = responseData[randomIndex].split("-")[1];
  $("#responseContent").html(content);
  $("#responseVerse").html(verse);
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function resetForm() {
  $("#type").val("");
  $("#content").val("");
}

$(function () {
  $("#submitBtn").on("click", function () {
    name = $("#name").val();
    email = $("#email").val() || "未填寫";
    type = $("#type").val();
    content = $("#content").val();

    const readyToSend = checkBlankInput(name, type, content);
    const data = {
      "entry.11614073": name,
      "entry.184427323": email,
      "entry.50517289": type,
      "entry.1370981891": content,
    };
    if (readyToSend) {
      sendData(data);
    }
  });
  $("#backBtn").on("click", function () {
    resetForm();
    $("#formSection").removeClass("d-none");
    $("#responseSection").addClass("d-none");
  });
});
