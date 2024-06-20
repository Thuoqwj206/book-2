    function changeFont() {
        var font = document.getElementById("font-select").value;
        var headings = document.querySelectorAll("h2, h3,h4");
        var paragraphs = document.getElementsByTagName("p");
    
        for (var i = 0; i < headings.length; i++) {
          headings[i].style.fontFamily = font;
        }
    
        for (var j = 0; j < paragraphs.length; j++) {
          paragraphs[j].style.fontFamily = font;
        }
      }
  
  
  function changeSize() {
    var size = document.getElementById("text-size-input").value;
    var paragraphs = document.getElementsByTagName("p");

    document.getElementById("content").style.fontSize = size + "px";
    for (var j = 0; j < paragraphs.length; j++) {
        paragraphs[j].style.fontSize = size + "px";
      }
  }
  function changeColor() {
    var color = document.getElementById("color-select").value;
    var headings = document.querySelectorAll("h2, h3,h4");
    for (var i = 0; i < headings.length; i++) {
        headings[i].style.color = color;
      }
    document.getElementById("content").style.color = color;
  }
  function scrollToHeader() {
    var headerElement = document.getElementById("main-header");
    headerElement.scrollIntoView({ behavior: "smooth" });
  }
  function changeBackgroundColor() {
    var colorPicker = document.getElementById("background-color-select");
    var bookContent = document.getElementById("content");
    bookContent.style.backgroundColor = colorPicker.value;
  }
  function toggleFullScreen() {
    var contentElement = document.getElementById("content");

    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (contentElement.requestFullscreen) {
        contentElement.requestFullscreen().then(function() {
          document.addEventListener("fullscreenchange", exitFullScreenHandler);
        });
      }
    }
  }

  function exitFullScreenHandler() {
    if (!document.fullscreenElement) {
      document.removeEventListener("fullscreenchange", exitFullScreenHandler);
    }
  }

  document.addEventListener("mouseup", highlightText);

  function highlightSelectedText() {
    var selectedText = window.getSelection().toString();
    if (selectedText !== "") {
      var cardContainer = document.getElementById("content");
      highlightTextInElement(cardContainer, selectedText);
    }
  }
  
  function highlightTextInElement(element, selectedText) {
    var children = element.childNodes;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.nodeType === 3) { // Text node
        var text = child.textContent;
        var highlightedText = text.replace(new RegExp(selectedText, "gi"), '<span class="highlight">$&</span>');
        var wrapper = document.createElement("span");
        wrapper.innerHTML = highlightedText;
        element.replaceChild(wrapper, child);
      } else if (child.nodeType === 1) { // Element node
        highlightTextInElement(child, selectedText);
      }
    }
  }
