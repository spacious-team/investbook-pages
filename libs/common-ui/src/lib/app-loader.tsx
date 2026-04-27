import { Spinner } from './spinner';

export function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      <Spinner className="size-20" />
    </div>
  );
}
