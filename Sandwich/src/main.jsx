import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthProvider';
import { BlogProvider } from './context/BlogContext';
import { MenuProviders } from './context/MenuContexts';
import { OfferProvider } from './context/OfferContext';
import { MenuCategoryProvider } from './context/MenuCategoryContext';
import { PopularChoiceProvider } from './context/PopularChoiceContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BlogProvider>
      <MenuProviders>
        <OfferProvider>
          <MenuCategoryProvider>
            <PopularChoiceProvider>
  <App />
  </PopularChoiceProvider>
  </MenuCategoryProvider>
  </OfferProvider>
  </MenuProviders>
  </BlogProvider>
</AuthProvider>
);
