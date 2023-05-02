<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
useHead({ title: "Настройки" });

const language = ref(localStorage.getItem('language') || "RU");
const fontMultiplier = ref(Number(localStorage.getItem('fontMultiplier')) || 1);

const epilepsyToggle = ref(localStorage.getItem('epilepsyToggle') === "true" || false);
const visuallyImpairedToggle = ref(localStorage.getItem('visuallyImpairedToggle') === "true" || false);
const dyslexiaToggle = ref(localStorage.getItem('dyslexiaToggle') === "true" || false);
const adhdToggle = ref(localStorage.getItem('adhdToggle') === "true" || false);

const user = ref(localStorage.getItem('user') || "professor");
const profName = ref(localStorage.getItem('profName') || "");
const group = ref(localStorage.getItem('group') || "");

function onSettingChange() {
    localStorage.setItem('language', language.value);
    localStorage.setItem('fontMultiplier', fontMultiplier.value.toString());
    localStorage.setItem('epilepsyToggle', epilepsyToggle.value.toString());
    localStorage.setItem('visuallyImpairedToggle', visuallyImpairedToggle.value.toString());
    localStorage.setItem('dyslexiaToggle', dyslexiaToggle.value.toString());
    localStorage.setItem('adhdToggle', adhdToggle.value.toString());
    localStorage.setItem('user', user.value);
    localStorage.setItem('profName', profName.value);
    localStorage.setItem('group', group.value);

    console.log("\nLanguage:", language.value);
    console.log("Font:", fontMultiplier.value);
    console.log("Epilepsy:", epilepsyToggle.value);
    console.log("Vision:", visuallyImpairedToggle.value);
    console.log("Dyslexia:", dyslexiaToggle.value);
    console.log("ADHD:", adhdToggle.value);
    console.log("User:", user.value);
    console.log("Professor:", profName.value);
    console.log("Group:", group.value);
}
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="h-[92vh] p-5 flex flex-col mx-auto">
            <div class="w-[360px]">
                <p class="text-lg font-black">
                    Выберете подходящие вам настройки доступности:
                </p>
                <div class="w-full h-0 border border-[#764462] mb-7"></div>

                <div class="w-full flex flex-row mb-3">
                    <select
                        v-model="language"
                        id="preset"
                        class="h-8 cursor-pointer w-[210px] rounded-lg bg-[#764462] hover:bg-[#EDB4A1] hover:text-[#2C2137] outline-none"
                        @change="onSettingChange()"
                    >
                        <option value="EN">English (EN)</option>
                        <option value="RU">Русский (RU)</option>
                    </select>
                    <p class="my-auto ml-3">Язык</p>
                </div>

                <div class="w-full flex flex-row mb-3">
                    <input
                        v-model="fontMultiplier"
                        id="large-range"
                        type="range"
                        min="1"
                        max="2"
                        step="0.01"
                        class="w-[210px] my-auto h-6 bg-[#C9304F] rounded-full appearance-none cursor-pointer accent-white"
                        @change="onSettingChange()"
                    />
                    <p class="my-auto ml-3">Размер шрифта</p>
                </div>

                <div class="w-full h-0 border border-[#764462] mb-7"></div>

                <my-toggle v-model="epilepsyToggle" @change="onSettingChange()"
                    >Профиль для людей с эпилепсией</my-toggle
                >
                <p class="text-gray-300 text-xs pl-14 mb-5">Смягчает цвета</p>
                <my-toggle v-model="visuallyImpairedToggle" @change="onSettingChange()"
                    >Профиль для слабовидящих</my-toggle
                >
                <p class="text-gray-300 text-xs pl-14 mb-5">Увеличивает контраст</p>
                <my-toggle v-model="dyslexiaToggle" @change="onSettingChange()"
                    >Профиль для людей с дислексией</my-toggle
                >
                <p class="text-gray-300 text-xs pl-14 mb-5">
                    Меняет шрифт на более дружелюбный
                </p>
                <my-toggle v-model="adhdToggle" @change="onSettingChange()"
                    >Профиль для людей с СДВГ</my-toggle
                >
                <p class="text-gray-300 text-xs pl-14 mb-5">Меньше отвлекающих вещей</p>

                <div class="w-full h-0 border border-[#764462] mb-7"></div>

                <input
                    type="radio"
                    value="professor"
                    v-model="user"
                    class="w-4 h-4 ring-offset-gray-800 bg-gray-700 border-gray-600 accent-[#C9304F]"
                    @change="onSettingChange()"
                />
                <label class="ml-3">Я преподаватель</label>
                <br />
                <input
                    type="radio"
                    value="student"
                    v-model="user"
                    class="w-4 h-4 ring-offset-gray-800 bg-gray-700 border-gray-600 accent-[#C9304F]"
                    @change="onSettingChange()"
                />
                <label class="ml-3">Я студент</label>

                <div class="w-full h-0 border border-[#764462] mb-7 mt-1"></div>

                <div v-if="user === 'professor'">
                    <label for="first_name" class="block mb-2 text-sm font-medium"
                        >ФИО:</label
                    >
                    <input
                        v-model="profName"
                        type="text"
                        id="first_name"
                        class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400"
                        @change="onSettingChange()"
                        placeholder="Коган Ю.Г."
                    />
                </div>
                <div v-else>
                    <label for="first_name" class="block mb-2 text-sm font-medium"
                        >Группа:</label
                    >
                    <input
                        v-model="group"
                        type="text"
                        id="first_name"
                        class="text-sm rounded-lg block w-full p-2.5 bg-[#764462] placeholder-gray-400"
                        @change="onSettingChange()"
                        placeholder="ИДБ-19-03"
                    />
                </div>
            </div>
        </div>
        <Navbar />
    </div>
</template>
