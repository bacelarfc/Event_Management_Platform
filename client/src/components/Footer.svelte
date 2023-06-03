<script>
    let year = new Date().getFullYear(); // Get current year for copyright
  
    import { onMount } from "svelte";
  
    let showFooter = false;
  
    onMount(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    });
  
    function handleScroll() {
      const footer = document.querySelector(".footer");
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
  
      if (scrollPosition >= pageHeight) {
        showFooter = true;
      } else {
        showFooter = false;
      }
    }
  </script>
  
  <footer class:visible={showFooter} class="footer">
    <div class="footer__content">
      <p class="footer__text">© {year} Eventur</p>
      <p class="footer__text">All rights reserved</p>
    </div>
  </footer>
  
  <style>
    .footer {
      background-color: #B6CEFC;
      color: #fff;
      display: flex;
      justify-content: center;
      padding: 1vh;
      width: 100%;
      height: 20%;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 999;
      opacity: 0;
      transition: opacity 0.3s;
    }
  
    .footer.visible {
      opacity: 1;
    }
  
    .footer__content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  
    .footer__text {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      font-weight: 400px;
    }
  </style>
  