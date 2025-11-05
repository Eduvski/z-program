async function fetchEntries() {
  const url = "scripts/entries.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    
    for(let i = 2008; i <= 2025; i++){
      generateColumn(i, result);
    }
    
  } catch (error) {
    console.error(error.message);
  }
}

fetchEntries();

function generateColumn(yearNumber, entriesArray) {

  let entriesEvents = '';
  let entriesDramaCD = '';
  let entriesLightNovel = '';
  let entriesVisualNovel = '';
  let entriesAnime = '';
  let entriesManga = '';
  let entriesOthers = '';


  for (let i = 0; i < entriesArray.length; i++) {
    const entry = entriesArray[i];
    if (entry.year === yearNumber) {
      const cover = entry.cover;
      const html = `<img src="${cover}" class="covers" alt="">`;

      switch (entry.type) {
        case "events":
          entriesEvents += html;
          break;
        case "dramaCD":
          entriesDramaCD += html;
          break;
        case "lightNovel":
          entriesLightNovel += html;
          break;
        case "visualNovel":
          entriesVisualNovel += html;
          break;
        case "anime":
          entriesAnime += html;
          break;
        case "manga":
          entriesManga += html;
          break;
        case "others":
          entriesOthers += html;
          break;
      }
    }
  }

  const columnHtml = `
     <div class="yearUnit">
        <div class="timeline-category">
          <div>${yearNumber}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesEvents}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesDramaCD}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesLightNovel}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesVisualNovel}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesAnime}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesManga}</div>
        </div>
        <div class="timeline-row">
          <div class="cover-div">${entriesOthers}</div>
        </div>
      </div>
  `;

  const timelineContainer = document.querySelector('.content-column');
  timelineContainer.insertAdjacentHTML('beforeend', columnHtml);
}
