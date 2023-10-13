export function formatText(text: string): string {
        // Format bold text
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
        // Format italic text
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
        // Format underline text
        text = text.replace(/__(.*?)__/g, '<u>$1</u>');
      
        // Format hyperlinks
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      
        // Format code text
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');
      
        // Format bold and italic text
        text = text.replace(/\*\*__(.*?)__\*\*/g, '<strong><em>$1</em></strong>');
      
        // Format bold and underline text
        text = text.replace(/\*\*__(.*?)__/g, '<strong><u>$1</u></strong>');
      
        // Format italic and underline text
        text = text.replace(/__(.*?)__\*\*/g, '<em><u>$1</u></em>');
      
        // Format bold, italic, and underline text
        text = text.replace(/\*\*\*__(.*?)__\*\*\*/g, '<strong><em><u>$1</u></em></strong>');
      
        return text;
      }
      