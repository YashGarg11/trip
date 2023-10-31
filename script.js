document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const target = document.querySelector(event.target.getAttribute('href'));
          target.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Form submission logic
  const tripForm = document.getElementById('trip-form');
  const tripDetails = document.getElementById('trip-details');
  tripForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const destinationInput = document.getElementById('destination');
      const dateInput = document.getElementById('date');
      const destination = destinationInput.value;
      const date = dateInput.value;
      if (destination.trim() === '' || date.trim() === '') {
          alert('Please enter a destination and date for your trip.');
          return;
      }
      tripDetails.innerHTML = `
          <h3>Your Trip Details:</h3>
          <p>Destination: ${destination}</p>
          <p>Date: ${date}</p>
      `;
      destinationInput.value = '';
      dateInput.value = '';
      showMap(destination);
  });

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const name = nameInput.value;
      const email = emailInput.value;
      if (name.trim() === '' || email.trim() === '') {
          alert('Please enter your name and email.');
          return;
      }
      alert('Form submitted successfully!');
      nameInput.value = '';
      emailInput.value = '';
  });

  // Three.js animation
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('scene-container').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  const car = new THREE.Mesh(geometry, material);
  const airplane = new THREE.Mesh(geometry, material);
  const balloon = new THREE.Mesh(geometry, material);

  scene.add(car, airplane, balloon);

  car.position.set(0, 0, -5);
  airplane.position.set(2, 1, -10);
  balloon.position.set(-2, 2, -15);

  camera.position.z = 5;

  function animate() {
      requestAnimationFrame(animate);

      // Add animation logic (e.g., rotation, movement) here

      renderer.render(scene, camera);
  }

  animate();

  // Placeholder function for showMap
// Function to show a static map image based on the destination using Mapbox Static Images API
function showMap(destination) {
  const mapContainer = document.getElementById('map');

  // Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
  const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  const mapboxBaseUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

  // Format the destination for the API request (e.g., convert spaces to %20)
  const formattedDestination = encodeURIComponent(destination);

  // Set the map center and zoom level (adjust as needed)
  const center = '0,0'; // Center of the map (longitude,latitude)
  const zoom = 10; // Zoom level (0-22)

  // Construct the API request URL
  const apiUrl = `${mapboxBaseUrl}/${center},${zoom},0,0/${mapContainer.offsetWidth}x${mapContainer.offsetHeight}@2x?access_token=${accessToken}&logo=false&marker-color=ff0000&text=${formattedDestination}`;

  // Set the map background as the returned URL
  mapContainer.style.backgroundImage = `url(${apiUrl})`;
  mapContainer.style.backgroundSize = 'cover';
}

});
