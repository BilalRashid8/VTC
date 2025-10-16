// Service de traduction utilisant MyMemory API (gratuite)
class TranslationService {
    private cache = new Map<string, string>();
    private readonly baseUrl = 'https://api.mymemory.translated.net/get';
  
    async translateText(text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> {
      // Vérifier le cache
      const cacheKey = `${sourceLang}-${targetLang}-${text}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }
  
      // Si même langue, retourner le texte original
      if (sourceLang === targetLang) {
        return text;
      }
  
      try {
        const response = await fetch(
          `${this.baseUrl}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );
  
        if (!response.ok) {
          throw new Error('Translation API error');
        }
  
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
          const translatedText = data.responseData.translatedText;
          
          // Mettre en cache
          this.cache.set(cacheKey, translatedText);
          
          return translatedText;
        } else {
          console.warn('Translation failed, returning original text');
          return text;
        }
      } catch (error) {
        console.error('Translation error:', error);
        return text; // Retourner le texte original en cas d'erreur
      }
    }
  
    async translateObject(obj: any, targetLang: string, sourceLang: string = 'en'): Promise<any> {
      if (typeof obj === 'string') {
        return await this.translateText(obj, targetLang, sourceLang);
      }
  
      if (Array.isArray(obj)) {
        const translated = [];
        for (const item of obj) {
          translated.push(await this.translateObject(item, targetLang, sourceLang));
        }
        return translated;
      }
  
      if (typeof obj === 'object' && obj !== null) {
        const translated: any = {};
        for (const [key, value] of Object.entries(obj)) {
          translated[key] = await this.translateObject(value, targetLang, sourceLang);
        }
        return translated;
      }
  
      return obj;
    }
  
    clearCache() {
      this.cache.clear();
    }
  }
  
  export const translationService = new TranslationService();
  
  // Hook pour utiliser la traduction dynamique
  export const useDynamicTranslation = () => {
    const translateDynamic = async (text: string, targetLang: string) => {
      return await translationService.translateText(text, targetLang);
    };
  
    return { translateDynamic };
  };