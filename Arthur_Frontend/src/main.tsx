import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BlogProvider } from './context/BlogContext.tsx';
import { OfferProvider } from './context/OfferContext.tsx';
import { MenuCategoryProvider } from './context/MenuCategoryContext.tsx';
import { MenuProviders } from './context/MenuContexts.tsx';
import { PopularChoiceProvider } from './context/PopularChoiceContext.tsx';


createRoot(document.getElementById("root")!).render(
<BlogProvider>
  <OfferProvider>
    <MenuCategoryProvider>
      <MenuProviders>
        <PopularChoiceProvider>
<App />
</PopularChoiceProvider>
</MenuProviders>
</MenuCategoryProvider>
</OfferProvider>
</BlogProvider>
);
