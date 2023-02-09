let hemberger = document.querySelector('#hemberger')
let navpage = document.querySelector('#navpage')
let close = document.querySelector('#close')


hemberger.addEventListener('click',function(){
 navpage.style.transform = 'translateY(0)';
})
close.addEventListener('click',function(){
 navpage.style.transform = 'translateY(-100%)';
})