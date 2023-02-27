
export default function  firstLetterUpperCase(word: string) {
    const wordFirstLetterUpperCase = word.charAt(0).toUpperCase() + word.slice(1);
    return wordFirstLetterUpperCase;
}


