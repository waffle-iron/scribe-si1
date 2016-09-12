Rails.application.routes.draw do
  root 'auth#login'

  get 'register' => 'users#new'
  resources :users

  get 'login' => 'auth#login'
  post 'login' => 'auth#authenticate'
  get 'logout' => 'auth#destroy'

  resources :documents
  resources :folders, :path => 'my-drive'

  get 'documents/children/:folder_id' => 'documents#find_children'
  get 'folders/children/:folder_id' => 'folders#find_children'

#  scope '/api' do
#    scope '/documents' do
#      get '/all' => 'documents#index'
#    end
#  end
end
