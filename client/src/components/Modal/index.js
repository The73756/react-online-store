import { Layout } from './Layout';
import { useMount } from '../../hooks/useMount';
import Portal from '../Portal';
import { ANIMATION_TIME } from '../../utils/consts';

const Modal = ({ opened, onClose, children }) => {
  const { mounted } = useMount({ opened, animationTime: ANIMATION_TIME });

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <Layout onClose={onClose} opened={opened}>
        {children}
      </Layout>
    </Portal>
  );
};

export default Modal;
