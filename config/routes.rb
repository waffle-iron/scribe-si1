Rails.application.routes.draw do

  root 'auth#login'

  get 'register' => 'users#new'
  resources :users

  get 'login' => 'auth#login'
  post 'login' => 'auth#authenticate'
  delete 'logout' => 'auth#destroy'

  resources :documents
  resources :folders, :path => 'my-drive'

  get 'document/new' => 'documents#create'
  get 'folder/new' => 'folders#create'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
