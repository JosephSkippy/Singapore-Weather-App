import { AppRouter } from '@/app/router';
import { AppProvider } from '@/app/provider';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
