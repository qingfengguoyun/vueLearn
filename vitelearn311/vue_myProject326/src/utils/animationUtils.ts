import type { Ref, VueElement } from "vue";


export function addAnimeToHtmlElement(ref: Ref<HTMLElement>, anime: string) {
    console.log("anime",ref.value)
    ref.value.classList.add(anime)
    setTimeout(() => {
        ref.value.classList.remove(anime)
    }, 2000)

}

