<script>
  import "../styles/footer.css";
  const year = new Date().getFullYear();

  import { onMount } from "svelte";

  let showFooter = false;
  let footerHeight = 100;

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  });

  function handleScroll() {
    const footer = document.querySelector(".footer");
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - footerHeight;

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
