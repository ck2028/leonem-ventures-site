const tallyUrl='https://tally.so/r/2E6lNp';
const businessEmail='leonemventures.chicago@gmail.com';

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',event=>{
    const href=link.getAttribute('href');
    if(href==="#contact"){
      event.preventDefault();
      window.location.href=tallyUrl;
      return;
    }
    const target=document.querySelector(href);
    if(target){
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

const contactCard=document.querySelector('.contact-card');
if(contactCard){
  const heading=contactCard.querySelector('h3');
  const paragraph=contactCard.querySelector('p');
  const button=contactCard.querySelector('.button');
  if(heading) heading.textContent='Founding-client intake';
  if(paragraph) paragraph.textContent='Complete the secure Leonem intake to share your business profile, active-project workload, current finance setup, and the financial-control problem you want to solve.';
  if(button){
    button.textContent='Start Secure Intake';
    button.href=tallyUrl;
  }
  if(!contactCard.querySelector('.business-email')){
    const emailLine=document.createElement('p');
    emailLine.className='fine business-email';
    emailLine.innerHTML=`Questions? <a href="mailto:${businessEmail}">${businessEmail}</a>`;
    contactCard.appendChild(emailLine);
  }
}

const footerBrand=document.querySelector('.footer-grid > div:first-child');
if(footerBrand && !footerBrand.querySelector('.footer-email')){
  const emailLine=document.createElement('span');
  emailLine.className='footer-email';
  emailLine.innerHTML=`<br><a href="mailto:${businessEmail}">${businessEmail}</a>`;
  footerBrand.appendChild(emailLine);
}

const intakeForm=document.getElementById('intakeForm');
if(intakeForm){
  const projects=document.getElementById('projects');
  const fitName=document.getElementById('fitName');
  const fitDescription=document.getElementById('fitDescription');
  const fitPrice=document.getElementById('fitPrice');
  const intakeResult=document.getElementById('intakeResult');
  const intakeSummary=document.getElementById('intakeSummary');
  const copySummary=document.getElementById('copySummary');
  const copyStatus=document.getElementById('copyStatus');

  const fitMap={
    '1-2':{name:'Project Control Core',price:'$395/month for Months 1–2 · then $595/month',description:'A likely starting point for a smaller operator with up to two active projects and standard activity volume.'},
    '3-5':{name:'Project Control Growth',price:'$695/month for Months 1–2 · then $995/month',description:'A likely starting point for a growing operator managing several concurrent jobs and needing deeper project-level reporting.'},
    '6-10':{name:'Project Control Portfolio',price:'$995/month for Months 1–2 · then starting at $1,495/month',description:'A likely starting point for a multi-project operator needing portfolio-level visibility, cash forecasting, and management reporting.'},
    '10+':{name:'Portfolio / Custom Scope Review',price:'Custom scope review required',description:'More than ten active projects generally requires a complexity review before Leonem can recommend scope and pricing.'}
  };

  function updateFit(){
    const fit=fitMap[projects.value];
    if(!fit){fitName.textContent='Complete the form';fitPrice.textContent='—';fitDescription.textContent='Your active-project count will provide an initial package reference. Final scope depends on transaction volume, entities, data quality, reporting cadence, and complexity.';return;}
    fitName.textContent=fit.name;fitPrice.textContent=fit.price;fitDescription.textContent=fit.description;
  }
  projects.addEventListener('change',updateFit);

  function valuesFor(name){return [...intakeForm.querySelectorAll(`input[name="${name}"]:checked`)].map(el=>el.value);}
  function val(name){const el=intakeForm.elements[name];return el&&el.value?el.value.trim():'';}

  intakeForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!intakeForm.checkValidity()){intakeForm.reportValidity();return;}
    const needs=valuesFor('needs');
    const interest=valuesFor('interest');
    const fit=fitMap[projects.value];
    const lines=[
      'LEONEM VENTURES — FOUNDING CLIENT INTAKE','',
      `Name: ${val('name')}`,`Company: ${val('company')}`,`Email: ${val('email')}`,`Phone: ${val('phone')||'Not provided'}`,`Business type: ${val('businessType')}`,`Primary market/location: ${val('location')||'Not provided'}`,'',
      `Active projects: ${val('projects')}`,`Business entities: ${val('entities')||'Not provided'}`,`Monthly transaction volume: ${val('transactions')||'Not sure'}`,`Accounting/bookkeeping system: ${val('accountingSystem')||'Not provided'}`,`Current finance support: ${val('financeSupport')||'Not provided'}`,`Timing: ${val('timing')||'Not provided'}`,'',
      `Areas needing attention: ${needs.length?needs.join('; '):'Not specified'}`,`Primary problem: ${val('problem')}`,`Services of interest: ${interest.length?interest.join('; '):'Not specified'}`,'',
      `Indicative package fit: ${fit?fit.name:'To be determined'}`,fit?`Indicative public pricing: ${fit.price}`:'','',
      'Acknowledgements confirmed: professional-boundary notice and intake accuracy.','Note: This intake preparation does not create a client or professional relationship.'
    ].filter(Boolean);
    intakeSummary.value=lines.join('\n');
    intakeResult.hidden=false;
    intakeResult.scrollIntoView({behavior:'smooth',block:'nearest'});
  });

  copySummary.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(intakeSummary.value);copyStatus.textContent='Intake summary copied.';}
    catch(error){intakeSummary.select();document.execCommand('copy');copyStatus.textContent='Intake summary copied.';}
  });
}
