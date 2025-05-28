<template>
    <div>
<div class="heroI3Launchpad">
    <div class="heroI3Launchpad__content">
        <h1 class="heroI3Launchpad__title">I3 Launchpad: Ignite,<br> Innovate, Impact</h1>
        <p class="heroI3Launchpad__description">Your gateway to transformative entrepreneurship.We provide the tools,<br> mentorship, and resources needed to turn innovative ideas into impactful<br> ventures</p>
    </div>

         <router-link to="#"><button class="I3LaunchpadButton">Register Now</button></router-link>
</div>        
     <div class="WhatIs">
        <h1>What Is I3 Launchpad?</h1>
      <p>
        I3 Launchpad is Impact360's premier startup acceleration program designed to<br/> empower entrepreneurs with the resources, knowledge, and network needed to scale<br/> their ventures and create lasting impact
      </p>
     </div>  
     <div class="cards-container">
        <ImpactCard title="Growth" description="Expanding our reach across continents, serving diverse industries">
          <template #icon>
            <i class="fas fa-chart-line"></i>
          </template>
        </ImpactCard>  
     </div>
    </div>
</template>

<script>
import ImpactCard from '@/components/ImpactCard.vue'
export default {
    name: 'I3Launchpad',
    components: {
        ImpactCard,
    },
}
</script>
<style scoped>
.heroI3Launchpad {
    font-family: sans-serif;
    background-image: url('@/assets/i32.jpg');
    background-size: cover;
    color: white;
    padding: 40px;
}
.heroI3Launchpad__title{
  font-weight: 600;
  font-display: 200px;
  margin-top: 100px;
  margin-bottom: 20px;
  font-size: 4.0rem;
  margin-bottom: 20px;
  max-width: 800px;
}
.heroI3Launchpad__description{
    font-size: 1.2rem;
    font-weight:300 ;
    margin-top:40px ;
    margin-bottom: 20px;
    max-width: 800px;
    line-height: 1.5;
  
}
.I3LaunchpadButton{
  font-family: sans-serif;
  font-size: medium;
  background-color: black;
  color: white;
  border-radius: 5px;
  margin: 2px 3px;
  padding: 20px 60px;
  border: none;
}
.I3LaunchpadButton:hover{
    background-color: #3a41a5;
    color:rgba(255, 255, 255, 0.8);
    transition: background-color 0.3s ease;
}
.WhatIs{
    align-items: center;
    Justify-content: center;
    text-align: center;
    padding: 20px 40px;
}
</style>
