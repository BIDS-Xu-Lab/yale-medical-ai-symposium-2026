var PEOPLE_PHOTO_BASE = 'assets/images/people/';

function resolvePhotoSrc(data) {
  if (data.photoSrc) return data.photoSrc;
  if (data.photo) {
    var slug = data.photo.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    return PEOPLE_PHOTO_BASE + slug + '.jpg';
  }
  return '';
}

/**
 * Renders a single agenda speaker card from data.
 * @param {Object} data - { photo|photoSrc, photoAlt, name, role, talk? }
 * @returns {HTMLElement} .agenda-speaker element
 */
function createAgendaSpeaker(data) {
    var wrap = document.createElement('div');
    wrap.className = 'agenda-speaker';
  
    var img = document.createElement('img');
    img.src = resolvePhotoSrc(data) || '';
    img.alt = data.photoAlt || data.name || '';
    img.className = 'agenda-speaker-photo';
    wrap.appendChild(img);
  
    var info = document.createElement('div');
    info.className = 'agenda-speaker-info';
  
    var nameEl = document.createElement('div');
    nameEl.className = 'agenda-speaker-name';
    nameEl.textContent = data.name || '';
    info.appendChild(nameEl);
  
    var roleEl = document.createElement('div');
    roleEl.className = 'agenda-speaker-role';
    roleEl.textContent = data.role || '';
    info.appendChild(roleEl);
  
    if (data.talk != null && data.talk !== '') {
      var talkEl = document.createElement('div');
      talkEl.className = 'agenda-speaker-talk';
      talkEl.textContent = data.talk;
      info.appendChild(talkEl);
    }
  
    wrap.appendChild(info);
    return wrap;
  }
  
  function renderAgendaSpeakerPlaceholders() {
    var placeholders = document.querySelectorAll('[data-agenda-speaker]');
    placeholders.forEach(function (el) {
      try {
        var data = JSON.parse(el.getAttribute('data-agenda-speaker'));
        var card = createAgendaSpeaker(data);
        el.parentNode.replaceChild(card, el);
      } catch (e) {
        console.warn('agenda-speaker: invalid data', el, e);
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAgendaSpeakerPlaceholders);
  } else {
    renderAgendaSpeakerPlaceholders();
  }