<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">

        <div class="footer-section">
          <img :src="logo" alt="Impact360 Logo" class="logo" />
          <p class="description">
            Empowering communities in africa through accessible tech education and
        entrepreneurship opportunities.<br/>Join us in building a more inclusive future
          </p>
        </div>

        <div class="footer-contacts">
            <div class="footer-contacts-section">
              <h3>Quick Links</h3>
              <ul class="footer-links">
                <li><RouterLink to="/about">About</RouterLink></li>
                <li><RouterLink to="/OngoingEvents">Events</RouterLink></li>
                <li><RouterLink to="/I3Launchpad">I3 Launchpad</RouterLink></li>
                <li><RouterLink to="#">Blog</RouterLink></li>
                <li><RouterLink to="/contact">Contact</RouterLink></li>
              </ul>
            </div>

            <div class="footer-contacts-section">
              <h3>Contact</h3>
              <p>Nakuru County, Kenya</p>
              <p><a href="mailto:impact360.i3@gmail.com" class="contact-link">impact360.i3@gmail.com</a></p>
              <p><a href="tel:+254113569079" class="contact-link">+254113569079</a></p>
            </div>

            <div class="footer-contacts-section">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a href="https://www.linkedin.com/company/impact360%E2%80%A2/" target="_blank" class="social-icon">
                  <font-awesome-icon :icon="['fab', 'linkedin']" />
                </a>
                <a href="https://www.instagram.com/impac_t360/?hl=en" target="_blank" class="social-icon">
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
                <a href="https://www.tiktok.com/@impact360_" target="_blank" class="social-icon">
                  <font-awesome-icon :icon="['fab', 'tiktok']" />
                </a>
              </div>
            </div>
          </div>
      </div>
      <hr class="divider" />

      <div class="footer-bottom">
        <p>© 2025 Impact360. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
import logo from "@/assets/logo.png";

// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

// Register icons globally
library.add(faLinkedin, faInstagram, faTiktok);
</script>

<style scoped>
template{
  padding: 0%;
  margin: 0%;
}
.footer {
  background-color: #333;
  color: #ccc;
  padding: 20px 0;
  text-align: center;
  font-family: sans-serif;
  overflow: none;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.footer-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  min-width: 100%;
}
.footer-contacts{
  width:100%;
  display: flex;
  justify-content: space-between;
}

.logo {
  height: 70px;
  width: 70px;
  margin-bottom: 10px;
}

.description {
  font-size: 15px;
  text-align: left;
  width: 100%;
}

/* === Quick Links Styling === */
.footer-contacts-section{
  justify-items: flex-start;
}
h3{
  color: #fff;
}
.footer-links {
  list-style: none;
  text-align: justify;
  padding: 0;
  text-decoration: underline;
}

.footer-links li {
  align-items: flex-start;
  display: block;
  margin-bottom: 8px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
}

.footer-links a:hover {
  color: white;
}

/* === Contact Links === */
.contact-link {
  text-decoration: none;
  display: block;
  color: #ccc;
}

.contact-link:hover {
  color: white;
}

/* === Social Media Icons === */
.social-links {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
}

.social-icon {
  color: #ccc;
  font-size: 24px;
  transition: color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon:hover {
  color: white;
}

/* === Divider and Footer Bottom === */
.divider {
  border: 1px solid #444;
  margin: 20px 0;
}

.footer-bottom {
  font-size: 14px;
  margin-top: 10px;
}

@media screen  and (max-width:650px){
  .footer-contacts{
    flex-direction: column;
  }
}
</style>
