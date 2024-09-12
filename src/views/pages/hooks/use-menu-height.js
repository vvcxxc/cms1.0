import { ref, onMounted } from '@vue/composition-api';

export const useMenuHeight = () => {
    const menuRef = ref()

    onMounted(() => {
        setTimeout(() => {
            let zoom = Number(parseFloat(window.screen.width / 1920).toFixed(2))
            zoom = zoom < 1 ? 0.67 : zoom

            const height = zoom * 130 + 'px'
            menuRef.value.style.height = `calc(100% - ${height})`
            menuRef.value.style.marginTop = `${100 * zoom}px`
        },);
    })

    return {
        menuRef
    }
}