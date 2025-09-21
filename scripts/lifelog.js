
import { formatList } from './utils.js';

async function loadEntries() {
  try {
    const [lifelogRes, microblogRes] = await Promise.all([
      fetch('/json/lifelog.json'),
      fetch('/json/microblog-2025.json'),
    ]);

    const lifelogData = await lifelogRes.json();
    const microblogData = await microblogRes.json();

    const merged = lifelogData.map(entry => {
      const microPosts = microblogData
        .filter(m => m.date === entry.date)
        .map(m => ({ time: m.time, entry: m.entry }));

      return { ...entry, microblog: microPosts };
    });

    const dateList = document.getElementById('date-list');
    const entryDate = document.getElementById('entry-date');
    const entryTime = document.getElementById('entry-time');
    const entryText = document.getElementById('entry-text');
    const entryHabits = document.getElementById('habits');
    const entryWatched = document.getElementById('entry-watched');
    const entryListened = document.getElementById('entry-listened');
    const entryPlayed = document.getElementById('entry-played');
    const entryMicroblog = document.getElementById('entry-microblog');
    const photoGallery = document.getElementById('photo-gallery');
    const entryMood = document.getElementById('entry-mood');
    const entryWeather = document.getElementById('entry-weather');
    const entryLocation = document.getElementById('entry-location');
    

    function displayEntry(entry) {
      entryDate.textContent = entry.date;
      entryTime.textContent = entry.time || '';
      entryText.textContent = entry.text || '';

      entryHabits.innerHTML = '';
      if (entry.habits && entry.habits.length) {
        entry.habits.forEach(habit => {
          const p = document.createElement('p');
          p.textContent = habit;
          entryHabits.appendChild(p);
        });
      }

      entryWatched.innerHTML =
        entry.watched !== false && entry.watched
          ? `<strong>tv shows watched:</strong> <i>${formatList(entry.watched)}</i>`
          : '';

      entryListened.innerHTML =
        entry.listened !== false && entry.listened
          ? `<strong>music listened to:</strong> <i>${formatList(entry.listened)}</i>`
          : '';

      entryPlayed.innerHTML =
        entry.played !== false && entry.played
          ? `<strong>played:</strong> <i>${formatList(entry.played)}</i>`
          : '';

             entryMood.innerHTML =
        entry.mood !== false && entry.mood
          ? `<strong>i felt:</strong> <i>${formatList(entry.mood)}</i>`
          : '';

             entryLocation.innerHTML =
        entry.locations !== false && entry.locations
          ? `<i>${formatList(entry.locations)}</i>`
          : '';

             entryWeather.innerHTML =
        entry.weather !== false && entry.weather
          ? `<strong>the weather today was:</strong> <i>${formatList(entry.weather)}</i>`
          : '';

      entryMicroblog.innerHTML = '';
      if (entry.microblog && entry.microblog.length) {
        entry.microblog.forEach(post => {
          const p = document.createElement('p');
          p.classList.add('microblog');
          p.innerHTML = `<strong>${post.time}</strong> <br> ${post.entry}`;
          entryMicroblog.appendChild(p);
          
        });
      }
        else {
        entryMicroblog.innerHTML = '<p>no microblog today :/</p>';
      }

      photoGallery.innerHTML = '';
      if (entry.images && entry.images.length) {
        entry.images.forEach(img => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('photo');

          const caption = document.createElement('p');
          caption.textContent = img.caption || '';

          const image = document.createElement('img');
          image.src = img.src;
          image.alt = img.caption || `Photo from ${entry.date}`;
          image.draggable = false;
          image.style.width = '100%';

          wrapper.appendChild(caption);
          wrapper.appendChild(image);
          photoGallery.appendChild(wrapper);
        });
      } else {
        photoGallery.innerHTML = '<p>no images today :/</p>';
      }
    }

    merged.forEach(entry => {
      const btn = document.createElement('button');
      btn.classList.add('date-button');
      btn.textContent = entry.date;
      btn.onclick = () => displayEntry(entry);
      dateList.appendChild(btn);
    });

    const hash = window.location.hash.replace('#', '');
    const entryFromHash = merged.find(e => e.date === hash);

    if (entryFromHash) {
      displayEntry(entryFromHash);
    } else if (merged.length > 0) {
      displayEntry(merged[0]);
    }

  } catch (err) {
    console.error('Error loading entries:', err);
  }
}

loadEntries();
