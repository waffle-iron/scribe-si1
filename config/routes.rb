Rails.application.routes.draw do
  root 'auth#login'

  get 'register' => 'users#new'
  resources :users

  get 'login' => 'auth#login'
  post 'login' => 'auth#authenticate'
  get 'logout' => 'auth#destroy'

  resources :documents
  resources :folders, :path => 'my-drive'

  get 'document/new' => 'documents#create'
  get 'folder/new' => 'folders#create'

  # isso será removido, juntamente com o StaticController
  # todas as dependências do angular ficarão em /public
  get 'directives/:path.html' => 'static#directive', :constraints => { :path => /.+/  }

#  scope '/api' do
#    scope '/documents' do
#      get '/all' => 'documents#index'
#    end
#  end
end
