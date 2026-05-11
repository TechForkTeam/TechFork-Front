type NavigateFn = (path: string) => void;

let _navigate: NavigateFn = (path) => {
  window.location.replace(path);
};

export const initGlobalNavigate = (navigate: NavigateFn) => {
  _navigate = navigate;
};

export const globalNavigate = (path: string) => _navigate(path);
