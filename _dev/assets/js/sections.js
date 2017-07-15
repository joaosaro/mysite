function main() {
   var anchorItems = document.getElementsByTagName('a');
   var spanItems = document.getElementsByTagName('span');
   var sections = document.getElementsByTagName('section');
   var list = document.getElementsByTagName('ul')[0];

   for (var i = 0; i < anchorItems.length; i++) {
      anchorItems[i].onclick = function() {

         for (var i = 0; i < anchorItems.length; i++) {
            anchorItems[i].classList.remove('selected');
         }

         for (var i = 0; i < sections.length; i++) {
            sections[i].style.opacity = '0';
            sections[i].style.zIndex = '-1';
         }

         this.classList.add('selected');

         var href = this.getAttribute('href');

         document.querySelector(href).style.opacity = '1';
         document.querySelector(href).style.zIndex = '1';

         if (href === '#hero') {
            list.style.marginBottom = '100px';
         } else if (href === '#projects') {
            list.style.marginBottom = '150px';
         } else if (href === '#contacts') {
            list.style.marginBottom = '200px';
         }
      }
   }
}

window.onload = function() {
   main();
}
