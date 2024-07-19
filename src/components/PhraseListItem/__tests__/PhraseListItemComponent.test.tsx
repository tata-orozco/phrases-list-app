import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import PhraseListItemComponent from '../PhraseListItemComponent';
import { usePhrase } from '../../../hooks/usePhrase';
import type { Phrase } from '../../../types';

jest.mock('../../../hooks/usePhrase', () => ({
    usePhrase: jest.fn(),
}));

describe('PhraseListItemComponent', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (usePhrase as jest.Mock).mockReturnValue({
            dispatch: mockDispatch,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const phrase: Phrase = {
        id: '1',
        title: 'Test phrase',
    };

    it('should render the phrase title correctly', () => {
        render(<PhraseListItemComponent phrase={phrase} />);
        expect(screen.getByText('"Test phrase"')).toBeInTheDocument();
    });

    it('should render the delete button', () => {
        render(<PhraseListItemComponent phrase={phrase} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call dispatch with correct action when delete button is clicked', () => {
        render(<PhraseListItemComponent phrase={phrase} />);
        fireEvent.click(screen.getByRole('button'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'show-modal', payload: { id: '1' } });
    });
});