import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import SuggestionsDropdown from '../SuggestionsDropdown';

const queryClient = new QueryClient();

const onSelectMock = vi.fn();
const onCloseMock = vi.fn();

const initialProps = {
    onClose: onCloseMock,
    onSelect: onSelectMock,
    suggestions: [] as any
}

const fullProps = {
    ...initialProps,
    suggestions: [{ login: 'john', avatar_url: 'https://example.com/john.jpg' }] as any
}

describe('SuggestionsDropdown', () => {
    describe('initial rendering', () => {
        beforeEach(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <SuggestionsDropdown {...initialProps} />
                </QueryClientProvider>
            );
        });

        afterEach(cleanup);

        it('should render the main container element', () => {
            const containerElement = screen.getByTestId('suggestions-dropdown-container');
            expect(containerElement).toBeInTheDocument();
        });

        it('should not render any suggestion items when the suggestions prop is an empty array', () => {
            const suggestionItems = screen.queryAllByRole('option');
            expect(suggestionItems).toHaveLength(0);
        });
    });

    describe('rendering with suggestions', () => {
        beforeEach(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <SuggestionsDropdown {...fullProps} />
                </QueryClientProvider>
            );
        });
        
        afterEach(cleanup);

        it('should render a suggestion item for each user in the suggestions prop', () => {
            const suggestionItems = screen.getAllByTestId('suggested-user-john');
            expect(suggestionItems).toHaveLength(fullProps.suggestions.length);
        });

        it('should display the login and avatar for each suggested user', () => {
            fullProps.suggestions.forEach((user: any) => {
                const loginElement = screen.getByText(user.login);
                const avatarElement = screen.getByAltText(user.login) as HTMLImageElement;

                expect(loginElement).toBeInTheDocument();
                expect(avatarElement).toBeInTheDocument();
                expect(avatarElement.src).toBe(user.avatar_url);
            });
        });
    });

    describe('user interaction', () => {
        beforeEach(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <SuggestionsDropdown {...fullProps} />
                </QueryClientProvider>
            );
        });

        afterEach(cleanup);

        it('should call the onSelect callback with the selected user login when a suggestion item is clicked', () => {
            const suggestionItem = screen.getByTestId('suggested-user-john');
            fireEvent.click(suggestionItem);
            expect(onSelectMock).toHaveBeenCalledWith(fullProps.suggestions[0].login);
        });

        it('should call the onClose callback when clicking outside the dropdown', () => {
            fireEvent.click(document);
            expect(onCloseMock).toHaveBeenCalled();
        });
    });
});