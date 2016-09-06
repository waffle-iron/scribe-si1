class FoldersController < ApplicationController
  include FoldersHelper
  before_action :is_logged_in?
  layout 'drive', only: [:index]

  def index
    puts 'folders#index'
  end

  def new
  end

  def show
  end

  def create
  end

  def edit
  end

  def update
  end

  def delete
  end
end
