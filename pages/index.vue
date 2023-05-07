<script setup lang="ts">
useHead({ title: "Привет!" });

onMounted(async ()=>{
    try {
        const user = localStorage.getItem('user');
        if (user === "professor" || user === "student") {
            navigateTo('/menu');
        }
    } catch {
        console.log("failed")
    }
});

function profReg() {
    localStorage.setItem('language', "RU");
    localStorage.setItem('fontMultiplier', "1");
    localStorage.setItem('epilepsyToggle', "false");
    localStorage.setItem('visuallyImpairedToggle', "false");
    localStorage.setItem('dyslexiaToggle', "false");
    localStorage.setItem('adhdToggle', "false");
    localStorage.setItem('user', "professor");
    localStorage.setItem('profName', "");
    localStorage.setItem('group', "");
    localStorage.setItem('subjectsJSON', "[]");

    navigateTo('/menu');
}

function studentReg() {
    localStorage.setItem('language', "RU");
    localStorage.setItem('fontMultiplier', "1");
    localStorage.setItem('epilepsyToggle', "false");
    localStorage.setItem('visuallyImpairedToggle', "false");
    localStorage.setItem('dyslexiaToggle', "false");
    localStorage.setItem('adhdToggle', "false");
    localStorage.setItem('user', "student");
    localStorage.setItem('profName', "");
    localStorage.setItem('group', "");
    localStorage.setItem('subjectsJSON', "[]");

    navigateTo('/menu');
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex justify-center">
            <div class="w-[40%] flex flex-col my-auto min-w-[360px] text-center">
                <p class="font-bold text-5xl">Привет!</p>
                <p class="font-bold text-lg mb-8">Вы к нам в роли кого?</p>
                <my-button @click="profReg()" class="mb-8 w-full">Я преподаватель</my-button>
                <my-button @click="studentReg()" class="w-full">Я студент</my-button>
                <img src="/stankin-logo.svg" class="mx-auto"/>
            </div>
        </div>
    </div>
</template>