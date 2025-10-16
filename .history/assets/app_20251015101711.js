// Year in footer
import Portfolio from './Portfolio';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Portfolio />
    </div>
  );
}

export default App;

document.getElementById('year').textContent = new Date().getFullYear();

// Typewriter
const roles = ["Software Developer", "Python Full-Stack", "AI Enthusiast", "Problem Solver"];
const twEl = document.getElementById('typewriter');
let ri = 0, li = 0, deleting = false;
function typeLoop(){
  const word = roles[ri % roles.length];
  twEl.textContent = word.slice(0, li);
  if(!deleting && li <= word.length){ li++; }
  else if(deleting && li >= 0){ li--; }
  if(li === word.length + 8){ deleting = true; }
  if(li === 0){ deleting = false; ri++; }
  setTimeout(typeLoop, deleting ? 35 : 90);
}
typeLoop();

// Theme toggle (dark <-> slightly brighter)
const toggle = document.getElementById('themeToggle');
let light = false;
toggle.addEventListener('click', () => {
  light = !light;
  document.documentElement.style.setProperty('--bg', light ? '#f7f8fb' : '#0b0d10');
  document.documentElement.style.setProperty('--bg-alt', light ? '#ffffff' : '#0f1216');
  document.documentElement.style.setProperty('--text', light ? '#0b0d10' : '#e8ecf1');
  document.documentElement.style.setProperty('--muted', light ? '#4b5563' : '#a8b0bb');
  toggle.textContent = light ? '☀️' : '🌙';
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Minimal confetti (fires once when Projects scrolls into view)
const confettiContainer = document.getElementById('confetti');
let confettiFired = false;
function fireConfetti(duration = 1200, count = 80){
  const colors = ["#6ee7ff","#9b8cff","#ffffff","#a7f3d0","#fde68a"];
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.style.position='absolute';
    p.style.width = (6+Math.random()*6) + 'px';
    p.style.height = (8+Math.random()*10) + 'px';
    p.style.background = colors[(Math.random()*colors.length)|0];
    p.style.left = (Math.random()*100) + 'vw';
    p.style.top = '-10px';
    p.style.opacity = '0.9';
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.borderRadius = '2px';
    p.style.transition = `transform ${duration}ms cubic-bezier(.2,.6,.2,1), top ${duration}ms cubic-bezier(.2,.6,.2,1), opacity 300ms ease`;
    confettiContainer.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.top = '110vh';
      p.style.transform = `translateX(${(-100+Math.random()*200)}px) rotate(${720+Math.random()*720}deg)`;
      setTimeout(()=>p.style.opacity='0', duration-250);
      setTimeout(()=>p.remove(), duration+300);
    });
  }
}
const proj = document.getElementById('projects');
const confIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !confettiFired){
      confettiFired = true;
      fireConfetti();
      confIO.unobserve(e.target);
    }
  })
},{threshold:0.4});
confIO.observe(proj);

// Contact form (Getform)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.textContent = "Sending...";
  const data = new FormData(form);

  // Basic validation
  if(!data.get('name') || !data.get('email') || !data.get('message')){
    statusEl.textContent = "Please fill name, email & message.";
    return;
  }

  try{
    const res = await fetch("https://getform.io/f/bnllmolb", {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });
    if(res.ok){
      statusEl.textContent = "Thanks! I'll get back to you soon.";
      form.reset();
    }else{
      statusEl.textContent = "Something went wrong. Please try again.";
    }
  }catch(err){
    statusEl.textContent = "Network error. Try again.";
  }
});
