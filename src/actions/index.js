export const changeTheme = (currentTheme) => {
    return {
        type: 'change_theme',
        payload: !currentTheme
    }
}