Rails.application.routes.draw do
  root 'auth#login'

  get 'register' => 'users#new'
  resources :users

  get 'login' => 'auth#login'
  post 'login' => 'auth#authenticate'
  post 'logout' => 'auth#destroy'

  resources :documents
  resources :folders, :path => 'my-drive'

  get 'document/new' => 'documents#create'
  get 'folder/new' => 'folders#create'

#  scope '/api' do
#    scope '/documents' do
#      get '/all' => 'documents#index'
#    end
#  end
end
