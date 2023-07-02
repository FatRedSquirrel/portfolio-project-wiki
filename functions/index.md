# Хуки и функции

Код хуков и функции **classNames** находится в *src/shared/lib*

## classNames
Функция для комфортной работы с классами scss modules. Соединяет несколько указанных классов в строку.
Есть 2 варианта: обычный и redesigned. Обычный нравится лично мне, redesigned - это тот, который использовал автор курса. В коде используются обе функции.

**Реализация:**

Мой вариант функции:
``` js
export default function classNames(...args: Array<unknown>) {
  return args
    .filter((item) => item && item)
    .join(' ');
}
```

Redesigned вариант:
``` js
export function classNamesRedesigned(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
```

## useObservePageScrool
Написан лично мной уже после завершения курса. Используется для определения, стоит ли показывать
кнопку скролла наверх. 

Инкапсулирует в себе состояние **goUpShown**, а также логику по его изменению в зависимости
от текущего положения пользователя на странице.

Во избежание частого изменения состояния и лишних ререндеров используется замыкание, в котором 
значение состояния изменяется только при достижении определенных значений скролла.

Можно реализовать это с помощью уже ранее написанного хука **useThrottle**, но с его помощью уже был
реализован механизм сохранения скролла, для разнообразия здесь использован другой подход.

Код хука:
``` js
export const useObservePageScrool = (offsetY: number) => {
  const [goUpShown, setGoUpShown] = useState(false);

  const observePageScroll = useCallback(() => {
    let shown = false;

    return () => {
      const offsetTop = window.scrollY;
      if (offsetTop > offsetY && !shown) {
        shown = true;
        setGoUpShown(true);
      } else if (offsetTop < offsetY && shown) {
        shown = false;
        setGoUpShown(false);
      }
    };
  }, [offsetY]);

  useEffect(() => {
    const scrollHandler = observePageScroll();

    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [observePageScroll]);

  return goUpShown;
};
```

## useAppToolbar
Предназначение хука описано [здесь](/common/layout/#toolbar).

Хук, определяет, на какой странице находится пользователь, и в зависимости от этого возвращает определенный тулбар. Набор страниц и соответствующих им тулбаров прописан там же в объекте **toolbarByAppRoute**.

``` js
export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
```

Осталось лишь смаппить текущий роут к ключу в объекте конфига роутинга, чтобы хук понял, на какой странице находится пользователь. Для этого написан хук **useRouteChange**, который на основании **location.pathname** определяет, какому роуту из конфига соответствует открытая страница:
``` js
export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
}
```

## useThrottle
Хук, использующийся для задания интервала между вызовами определенной функции.
Используется в реализации механизма сохранения скролла, чтобы слишком часто не
изменять redux состояние и не вызывать лагов приложения. Подробнее о сохранении скролла в приложении [здесь](/pages/articles/)

``` js
export default function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef(false);

  return (...args: any[]) => {
    if (!throttleRef.current) {
      callback(...args);
      throttleRef.current = true;

      setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }
  };
}
```

## useAppDispatch
Классический хук для работы с redux в тайпскрипте 
``` js
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
```

## useDebounce
Классический хук для дебаунса вызова функции. Используется в поиске, фильтрах и сортировке на странице статей
``` js
export default function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

## useHover
Хук для обработки наведения курсора на элемент. Возвращает состояние **isHovered**, а также коллбэки 
**onMouseEnter** и **onMouseLeave**, которые меняют состояние при наведении кусора на нужный элемент и отведении курсора от 
него. Используется в старом дизайне. При наведении на карточку статьи показывается дата ее публикации

``` js
export default function useHover(): useHoverResult {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return useMemo(() => 
    [isHovered, { onMouseEnter, onMouseLeave }], 
    [isHovered, onMouseEnter, onMouseLeave]
  );
}
```

## useInfiniteScroll
Хук, который инкапсулирует в себе логику по наблюдению за тем, находится ли нужный элемент во view порте, и 
вызову соответствующего коллбэка в нужный момент. Принимает на вход ссылки на контейнер и триггер, а также коллбэк, 
который необходимо вызвать при появлении триггера во view. Хук используется на странице со списком статей

``` js
export default function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const {
    callback,
    triggerRef,
    wrapperRef,
  } = props;

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.current.observe(triggerElement);
    }

    return () => {
      if (observer.current && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
```

## useInitialEffect
Аналог useEffect, написанный для разделения приложения и сторибука. 
Изначально писались стори кейсы и на некоторые страницы, на которых при инициализации
отправлялись запросы на сервер, из-за чего сторибук на них выдавал ошибку. Данный хук
решил проблему. В вебпаке была введена дополнительная переменная окружения **__PROJECT__**, которая отвечала
за определение типа проекта

``` js
export function useInitialEffect(callback: () => void, dependencies: any[]) {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback();
    }
    // eslint-disable-next-line
  }, dependencies);
}
```

## useModal
Хук, написанный для соблюдения принципа **DRY**. Логика, описанная в нем, используется и в компоненте 
**Modal** и в компоненте **Drawer**, предназначенном для мобильных девайсов (подробнее [здесь](/common/mobile/)). Отвечает за анимацию закрытия модального окна, навешивание обработкичка нажатия на ESC для закрытия окна и т. д.
``` js
export function useModal(props: UseModalProps) {
  const {
    onClose,
    isOpen,
    lazy,
    animationDelay,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, animationDelay);
    }
  }, [onClose, animationDelay]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    isMounted,
    close,
  };
}
```