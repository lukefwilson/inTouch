class CreateConnectionsGroups < ActiveRecord::Migration
  def change
    create_table :connections_groups, id: false do |t|
      t.integer :connection_id
      t.integer :group_id
    end
  end
end
