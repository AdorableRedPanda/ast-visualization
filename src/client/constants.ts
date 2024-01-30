export const CODE_EXAMPLE = `
interface Props {
  name: string;
}

const App: React.FC<Props> = ({ name }) => <h2>Hello {name}!</h2>
`;
export const NO_CONTAINERS_ERROR = 'Some container was not found';
export const UNSUPPORTED_MESSAGE_WORKER = 'Worker doesn\'t support message type:';
export const WORKER_INIT = 'Worker initialized';

const buildTime = (new Date(import.meta.env.VITE_TIMESTAMP)).toLocaleString('en-US');
const appVersion = import.meta.env.VITE_VERSION;
export const BUILD_INFO = `Version: ${appVersion}. Build time: ${buildTime}`;
