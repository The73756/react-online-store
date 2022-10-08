import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMount } from '../../hooks/useMount';
import { ANIMATION_TIME } from '../../utils/consts';
import Portal from '../Portal';
import styles from './Modal.module.scss';

const modalAnimation = {
  enter: styles.modalEnter,
  enterActive: styles.modalEnterActive,
  exit: styles.modalExit,
  exitActive: styles.modalExitActive,
};

const Modal = ({ opened, onClose, children }) => {
  const { mounted } = useMount({ opened, animationTime: ANIMATION_TIME });
  const [animationIn, setAnimationIn] = useState(false);
  const modalRef = useRef();
  console.log(opened, animationIn);
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  useEffect(() => {
    mounted
      ? document.body.classList.add('disable-scroll')
      : document.body.classList.remove('disable-scroll');
    return () => document.body.classList.remove('disable-scroll');
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  // не срабатывает на enter //

  return (
    <Portal>
      <CSSTransition
        nodeRef={modalRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={modalAnimation}
        onEnter={() => console.log('123123')}
        in={animationIn}>
        <div className={styles.modal} ref={modalRef} onClick={onClose}>
          <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
