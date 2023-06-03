<script>
    import '../styles/eventur.css';
    let image = "../../images/myconcert.jpeg"; // Replace with your own image path
    let title = "Welcome to Eventur"; // Replace with your own title
    let subtitle = "Find the best events in the city"; // Replace with your own subtitle
    let altText = "Image showcasing the excitement of events in the city"; // Replace with an appropriate alt text
</script>

<section class="hero">
    <div class="hero__image-container">
      <img src="{image}" alt="{altText}" class="hero__image" />
    </div>
    <div class="hero__content">
      <h1 class="hero__title">{title}</h1>
      <p class="hero__subtitle">{subtitle}</p>
    </div>
  </section>
  
