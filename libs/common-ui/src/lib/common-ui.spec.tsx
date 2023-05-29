import { render } from '@testing-library/react';

import CommonUi from './common-ui';

describe('CommonUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommonUi />);
    expect(baseElement).toBeTruthy();
  });
});
