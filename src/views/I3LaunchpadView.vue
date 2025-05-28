<template>
    <div>
       <I3Launchpad />
       <ImpactCard />
    </div>
    
</template>
<script>
import I3Launchpad from '@/components/pages/I3Launchpad.vue';
import ImpactCard from '@/components/ImpactCard.vue';
export default {
    name: 'I3LaunchpadView',
    components: {
        I3Launchpad,
        ImpactCard
    },
};
</script>
<style scoped> </style>