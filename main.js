import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// keyword input
// create an array of keyword strings
const keyword = ["jokes", "memes", "funny"]
// create a variable for the button that the user can click to use suggested keyword
const keywordBtn;

function createButtons(){
// take strings in array and create buttons in HTML
// use loop that auto generate and appends button for each string in array
for (var i=0; i <keyword.length; i++) {
  // create variable for button
  var keywordBtn = $("<button>");
  // add keyword to button
  keywordBtn.text(keyword[i]);
  // assign a data attribute to each button
  keywordBtn.attr("data-name", keyword[i]);
  // add a class of keyword-btn to each button as well as other classes to change the color, padding, and margin of the button.
  keywordBtn.addClass("btn btn-primary p-2 mr-3 mb-2 keyword-btn");
  // append each button to the keyword-btn-div in the HTML.
  $("#keyword-btn-div").append(keywordBtn);
}
}
}

const keywordInput = document.getElementById('jokes');

keywordInput.addEventListener, on click, populate the search box

document.getElementById('search-input').innerHTML = output;


searchForm.addEventListener('submit', e => {
  // get sort by:
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get results per page
  const searchLimit = document.getElementById('limit').value;
  // get search input
  const searchTerm = searchInput.value;
  // check for search input
  if (searchTerm == '') {
  // Show message
    showMessage('Please enter search input', 'alert-warning');
  }
  else {
    showMessage('');

  }
  // clear search field after user press submit
  searchInput.value = '';

  // search reddit; pass following parameters to reddit API
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      // check if reddit post has image. if no image, display default image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://redditupvoted.files.wordpress.com/2019/10/dxfmwbkq.png';
      output += `
      <div class="card">
      <h5 class="card-header bg-white" p-2>
      <a class="text-dark" href="https://reddit.com${post.permalink}" target="_blank">${truncateString(post.title, 200)}</a></h5>
      <img class="card-img-top" src="${image}" alt="Reddit Card Image">
      <div class="card-body p-2">
        <div class="card-text">${truncateString(post.selftext, 200)}
        <a href="${(post.url)}" target="_blank"><small>${shortUrl(post.url,32)}</small></a>
        </div>
      </div>
      <div class="card-footer bg-white p-2">
      <span class="badge badge-dark">Subreddit: ${post.subreddit}</span><br>
        <a class="badge badge-pill badge-secondary" href="https://reddit.com${post.permalink}" target="_blank">Upvotes: ${post.score}</a>
        <a class="badge badge-pill badge-secondary" href="https://reddit.com${post.permalink}" target="_blank">Comments: ${post.num_comments}</a>
      </div>
    </div>
    </a>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

}

// Truncate String Function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}

//Truncate URL Function
function shortUrl(url, l){
  var l = typeof(l) != "undefined" ? l : 50;
  var chunk_l = (l/2);
  var url = url.replace("http://","").replace("https://","");

  if(url.length <= l){ return url; }

  var start_chunk = shortString(url, chunk_l, false);
  var end_chunk = shortString(url, chunk_l, true);
  return start_chunk + ".." + end_chunk;
}
function shortString(s, l, reverse){
  var stop_chars = [' ','/', '&'];
  var acceptable_shortness = l * 0.80; // When to start looking for stop characters
  var reverse = typeof(reverse) != "undefined" ? reverse : false;
  var s = reverse ? s.split("").reverse().join("") : s;
  var short_s = "";

  for(var i=0; i < l-1; i++){
      short_s += s[i];
      if(i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0){
          break;
      }
  }
  if(reverse){ return short_s.split("").reverse().join(""); }
  return short_s;
}