// EDIT THIS LIST to add or change artwork. Put your images in the images/ folder.
// Each image can be portrait, square, or landscape; it will never be cropped.
const artworks = [
  {title:'Untitled 01',year:'2026',medium:'Medium and dimensions',image:'images/placeholder-1.svg'},
  {title:'Untitled 02',year:'2026',medium:'Medium and dimensions',image:'images/placeholder-2.svg'},
  {title:'Untitled 03',year:'2026',medium:'Medium and dimensions',image:'images/placeholder-3.svg'},
  {title:'Untitled 04',year:'2026',medium:'Medium and dimensions',image:'images/placeholder-4.svg'}
];
const main=document.querySelector('#content');
const viewer=document.querySelector('#viewer');
let current=0;
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 const page=(location.hash.slice(1)||'work').toLowerCase();
 document.querySelectorAll('[data-page]').forEach(a=>a.setAttribute('aria-current',a.dataset.page===page?'page':'false'));
 if(page==='work'){
  main.innerHTML='<section class="gallery" aria-label="Artwork">'+artworks.map((a,i)=>`<article class="artwork"><button type="button" data-index="${i}" aria-label="Enlarge ${escapeHtml(a.title)}"><img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy"></button><div class="details">${escapeHtml(a.title)}, ${escapeHtml(a.year)}<div class="secondary">${escapeHtml(a.medium)}</div></div></article>`).join('')+'</section>';
  main.querySelectorAll('[data-index]').forEach(b=>b.addEventListener('click',()=>openViewer(Number(b.dataset.index))));
 }else if(page==='about')main.innerHTML='<section class="text-page"><h1>About</h1><p>Cindy Wang is an artist working in painting and drawing.</p><p>Replace this text with a short artist biography.</p></section>';
 else if(page==='cv')main.innerHTML='<section class="text-page"><h1>CV</h1><p>Education, exhibitions, residencies, and selected projects.</p><p>Replace this text with your CV.</p></section>';
 else if(page==='contact')main.innerHTML='<section class="text-page"><h1>Contact</h1><p>Add your professional email address and any links you would like to share.</p></section>';
 else {location.hash='#work';return;}
 window.scrollTo(0,0);
}
function openViewer(i){current=(i+artworks.length)%artworks.length;const a=artworks[current];document.querySelector('#viewer-image').src=a.image;document.querySelector('#viewer-image').alt=a.title;document.querySelector('#viewer-caption').textContent=`${a.title}, ${a.year} — ${a.medium}`;if(!viewer.open)viewer.showModal()}
document.querySelector('.close').onclick=()=>viewer.close();document.querySelector('.previous').onclick=()=>openViewer(current-1);document.querySelector('.next').onclick=()=>openViewer(current+1);viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});document.addEventListener('keydown',e=>{if(!viewer.open)return;if(e.key==='ArrowRight')openViewer(current+1);if(e.key==='ArrowLeft')openViewer(current-1)});window.addEventListener('hashchange',render);document.querySelector('#year').textContent=new Date().getFullYear();render();
