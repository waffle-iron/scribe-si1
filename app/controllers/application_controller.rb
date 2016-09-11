class ApplicationController < ActionController::Base
  include ApplicationHelper, AuthHelper, DocumentsHelper, FoldersHelper, UsersHelper
  protect_from_forgery with: :exception
end
