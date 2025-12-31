$(function(){
	$('#BackTop').click(function(){ 
		$('html,body').animate({scrollTop:0}, 333);
	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 300 ){
			$('#BackTop').fadeIn(222);
		} else {
			$('#BackTop').stop().fadeOut(222);
		}
	}).scroll();
});

  document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuContent = document.querySelector('.menu-content');
    const closeBtn = document.getElementById('closeMenu'); // 直接取用 HTML 的按鈕

    if (!menuIcon || !mobileMenu || !menuContent || !closeBtn) {
      console.error('缺少必要元素！');
      return;
    }

    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = menuIcon.getBoundingClientRect();
      menuContent.style.left = (rect.left + window.scrollX) + 'px';
      menuContent.style.top = (rect.bottom + window.scrollY + 5) + 'px';
      mobileMenu.style.display = 'block';
    });

    function closeMenu() {
      mobileMenu.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  });
